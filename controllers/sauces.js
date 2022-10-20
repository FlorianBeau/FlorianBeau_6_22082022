const { router } = require("../app");

exports.getAllSauces = (req, res) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getById = (req, res) => {
  res.status(200).json({ message: "Récupérer une sauce" });
};

exports.postPictureAndSauce = (req, res) => {
  res.status(200).json({ message: "Image et Sauce" });
};

exports.putUpdateSauce = (req, res) => {
  res.status(200).json({ message: "Met à jour la sauce" });
};

exports.deleteById = (req, res) => {
  res.status(200).json({ message: "Supprime la sauce de l'ID indiqué " });
};

exports.postLike = (req, res) => {
  res
    .status(200)
    .json({ message: "Définit le statut Like pour l'userId founi" });
};
