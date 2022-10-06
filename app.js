// 2 CREATION D'UNE APPLICATION

// Import de la librairie "express" permettant de connecter MongoDB à Node.js
const express = require("express");

const app = express();

// Import du nouveau modèle Mongoose dans l'application
const Thing = require("./models/thing");

// Importation de Mongoose (package qui facilite les intéractions avec la base de données)
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://FloleDev6942:Sbq3yueQAjI1sJLO@cluster0.vyoctbw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  console.log("Requête reçue !");
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

app.use((req, res, next) => {
  console.log("Réponse envoyée avec succès !");
});

module.exports = app;
