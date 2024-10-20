import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import Groq from "groq-sdk";

env.config();

const groq = new Groq({apiKey: process.env.GROQ_API_KEY})

const app = express();
const port = 3000;
const saltRounds = 10;

app.set("view engine", "ejs"); // Set EJS as the template engine
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard.ejs");
  } else {
    res.redirect("/login");
  }
});

// New routes for scrolling and profile pages
app.get("/scrolling", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("scrolling.ejs"); // Render scrolling.ejs
  } else {
    res.redirect("/login");
  }
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile.ejs"); // Render profile.ejs
  } else {
    res.redirect("/login");
  }
});

app.get("/create", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("create.ejs"); // Renders the cat profile creation page
  } else {
    res.redirect("/login");
  }
});

app.get('/feedback', (req, res) => {
  res.render('feedback'); // Adjust to your actual feedback EJS file
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/create",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.redirect("/create"); // Fixed typo: "req.redirect" to "res.redirect"
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/dashboard");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Call Groq API for chat completions
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "What are some suggestoins you can give me to improve on Data Structure, and what are some links for help for my next midterm", // Use user input for the message content
        },
      ],
      model: "mixtral-8x7b-32768", // Specify the model to use
    });

    // Get the bot's response
    const botResponse = completion.choices[0]?.message?.content || "Sorry, I didn't understand that.";
    res.json({ response: botResponse }); // Send response back to the client
  } catch (error) {
    console.error("Error with Groq API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
