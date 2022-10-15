// APPLICATION EXPRESS

// Récupère la librairie "Express" pour gérer plus facilement des requêtes http côté backend
const express = require("express");

// Récupère la fonction "body-parser" pour transformer une demande en objet Javascript
const bodyParser = require("body-parser");

// Récupère la librairie Mongoose qui crée une connexion entre MongoDB et Node.js
const mongoose = require("mongoose");

// Enregistrement du nouveau routeur
const stuffRoutes = require("./routes/stuff");

// Enregistrement du routeur
const userRoutes = require("./routes/user");

// Accès au "path" du serveur
const path = require("path");

// Connecte la librairie Mongoose à la base de données noSQL "MongoDB"
mongoose
  .connect(
    "mongodb+srv://FloleDev6942:Sbq3yueQAjI1sJLO@cluster0.vyoctbw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express(); // ???????????????????????

// Prévois un évenement qui exécute du code à chaque requête (méthode)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

// C'est du routing: on lui demande si il trouve l'url: "/api/stuff", si oui il exécute "stufRoutes"
// app = application express
// app.use = ""évenement" identique à enventlistener
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;
