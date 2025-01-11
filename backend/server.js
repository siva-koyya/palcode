const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const env = require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
const session = require("express-session");
const { google } = require("googleapis"); // Import the Google API client

const app = express();
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: "https://palcodesite.onrender.com/", // Allow only this origin
  credentials: true, // Allow cookies/credentials
};
app.use(cors(corsOptions));

// Initialize session for Google Auth
app.use(
  session({
    secret: process.env.SessionKey || 5556,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    },
  })
);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

let users = {};
let layouts = {};

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sivarock083@gmail.com",
    pass:"rfzo weja oedz fpow",
  },
});

// Google OAuth Configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: ``,
      clientSecret: ``,
      callbackURL: "https://palcodesite.onrender.com//api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile,accessToken);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Blaash</h1><a href='/api/auth/google'>Login with Google</a>"
  );
});

// Routes for Google OAuth
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("https://palcodesite.onrender.com");
  }
);

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Unauthorized");
  }
  let response={
    name: req.user.displayName,
    email: req.user.emails[0].value,
    picture: req.user.photos[0].value,
  }
  localStorage.setItem("user-info",response)
  res.json();
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// OTP Login API
app.post("/api/login", (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  users[email] = { otp: otp, verified: false };

  const mailOptions = {
    from: "sivarock083@gmail.com",
    to: email,
    subject: "Your Blash code login",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json("give the valid email");
    }
    res.json("Successfully OTP sent.");
  });
});

app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!users[email] || users[email].otp !== Number(otp)) {
    return res.status(400).send({ success: false });
  }

  users[email].verified = true;
  res.send({ success: true });
});

// YouTube API Integration
const youtube = google.youtube("v3");

// Fetch YouTube Playlists
app.get("/api/youtube/playlists", async (req, res) => {
  try {
    const response = await youtube.playlists.list({
      part: "snippet",
      channelId: "", // Replace with your channel ID
      maxResults: 10,
      key:"", // Your YouTube API key
    });
    res.json(response.data.items);
    console.log(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

// Fetch Videos in a Playlist
app.get("/api/youtube/playlist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await youtube.playlistItems.list({
      part: "snippet",
      playlistId: id,
      maxResults: 10,
      key: "AIzaSyD7k3DGsdrqjpWqLKU6ee1elIUTjkzBHLg", // Your YouTube API key
    });
    res.json(response.data.items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos in playlist" });
  }
});

// Save and Load Layout APIs
app.post("/api/save-layout", (req, res) => {
  const { layout } = req.body;
  const id = uuidv4();
  layouts[id] = layout;
  res.send("Layout saved.");
});

app.get("/api/load-layout", (req, res) => {
  res.send(layouts);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
