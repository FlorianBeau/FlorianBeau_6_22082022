// Format de données en base et fonctionnalités associées à ces données: find, update...

// On crée un schéma Sauce (modèle)
const mongoose = require("mongoose");

// FALSE INDIQUE POUR TESTS SUR DES PROPRIETES ////////////////////////////////////////////////////////

const sauceSchema = mongoose.Schema({
  // L'identifiant MongoDB unique de l'utilisateur qui a créé la sauce:
  userId: { type: String, required: true },
  // Le nom de la sauce:
  name: { type: String, required: true },
  // Le fabricant de la sauce:
  manufacturer: { type: String, required: true },
  // Description de la sauce:
  description: { type: String, required: true },
  // le principal ingrédient épicé de la sauce:
  mainPepper: { type: String, required: true },
  // L'URL de l'image de la sauce téléchargée par l'utilisateur:
  imageUrl: { type: String, required: true },
  // Nombre entre 1 et 10 décrivant la sauce:
  heat: { type: Number, required: false },
  // Nombre d'utilisateurs qui aiment (= likent) la sauce:
  likes: { type: Number, required: false, default: 0 },
  // Nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce:
  dislikes: { type: Number, required: false, default: 0 },
  // : [ "String <userId>" ] Tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce:
  usersLiked: { type: [String], required: false, default: [] },
  // [ "String <userId>" ] — tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce:
  usersDisliked: { type: [String], required: false, default: [] },
});

module.exports = mongoose.model("Sauce", sauceSchema);
