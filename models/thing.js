// CREATION D'UN SCHEMA DE DONNEES
// Import de "Mongoose" (librairie permettant de connecter MongoDB à Node.js)
const mongoose = require("mongoose");

// Schéma de données contenant les champs souhaités pour chaque thing puis export nommé "thing"
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// La méthode "model" transforme le modèle en un modèle utilisable
module.exports = mongoose.model("Thing", thingSchema);
