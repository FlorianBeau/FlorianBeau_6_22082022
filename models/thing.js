// On crée un schéma Thing (modèle)
const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
  /*
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
*/
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
  heat: { type: Number, required: true },
  // Nombre d'utilisateurs qui aiment (= likent) la sauce:
  likes: { type: Number, required: true },
  // Nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce:
  dislikes: { type: Number, required: true },
  // : [ "String <userId>" ] Tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce:
  usersLiked: { type: String, required: true },
  // [ "String <userId>" ] — tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce:
  usersDisliked: { type: String, required: true },
});

module.exports = mongoose.model("Thing", thingSchema);
