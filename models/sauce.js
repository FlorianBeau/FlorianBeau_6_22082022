// CREATION DU SCHEMA SAUCE (modèle)
const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: false },
  heat: { type: Number, required: true },
  // Nombre d'utilisateurs qui aiment (= likent) la sauce:
  likes: { type: Number, required: false, default: 0 },
  // Nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce:
  dislikes: { type: Number, required: false, default: 0 },
  // Tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce:
  usersLiked: { type: [String], required: false, default: [] },
  // Tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce:
  usersDisliked: { type: [String], required: false, default: [] },
});

module.exports = mongoose.model("Sauce", sauceSchema);
