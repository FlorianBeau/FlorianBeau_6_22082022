// CREATION DU MIDDLEWARE POUR LA GESTION DES SAUCES

const Sauce = require("../models/sauce");
const fs = require("fs");
const { findOneAndDelete } = require("../models/sauce");
const { default: cluster } = require("cluster");

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Récupération d'une sauce par son identifiant
exports.getById = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

// Publication d'une sauce
exports.postPictureAndSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    // ... = spread : prend tout ce qu'il y a dedans
    ...sauceObject,
    userId: req.token.userId,
    imageUrl: "",
  });
  if (req.file)
    sauce.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Modification de la sauce
exports.putUpdateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.token.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        if (filename !== "") {
          fs.unlink(`images/${filename}`, () => {
            Sauce.updateOne(
              { _id: req.params.id },
              { ...sauceObject, _id: req.params.id }
            )
              .then(() => res.status(200).json({ message: "Objet modifié!" }))
              .catch((error) => res.status(401).json({ error }));
          });
        } else {
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Objet modifié!" }))
            .catch((error) => res.status(401).json({ error }));
        }
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Suppression d'une sauce
exports.deleteById = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.token.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        if (filename !== "")
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Objet supprimé !" }))
              .catch((error) => res.status(401).json({ error }));
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Likes et Dislikes
exports.postLike = (req, res, next) => {
  // Fonctionnement
  // 1 = On récupère la sauce par son ID
  // 2 = Si utilisateur à aimé la sauce, on ajoute 1 dans likes et son userId dans UserLike
  // 3 = Si utilisateur n'a pas aimé la sauce, on ajoute 1 dans dislikes et son UserId dans UserDislikes
  // 4 = Si il retire sa réaction
  // 4.1 = Si userId est dans tableau UserLikes on retire le like
  // 4.2 = Sinon on retire le dislike

  Sauce.findOne({
    _id: req.params.id,
  }).then((sauce) => {
    if (req.body.like == 1) {
      if (sauce.usersLiked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà likée" });
      } else if (sauce.usersDisliked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà dislikée" });
      } else {
        sauce.likes++;
        sauce.usersLiked.push(req.token.userId);
      }
    } else if (req.body.like == 0) {
      if (
        !sauce.usersDisliked.includes(req.token.userId) &&
        !sauce.usersLiked.includes(req.token.userId)
      ) {
        return res.status(400).json({ message: "Requête non authorisée" });
      } else if (sauce.usersDisliked.includes(req.token.userId)) {
        sauce.dislikes--;
        sauce.usersDisliked.splice(
          sauce.usersDisliked.indexOf(req.token.userId)
        );
      } else {
        sauce.likes--;
        sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.token.userId), 1);
      }
    } else if (req.body.like == -1) {
      if (sauce.usersLiked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà likée" });
      } else if (sauce.usersDisliked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà dislikée" });
      } else {
        sauce.dislikes++;
        sauce.usersDisliked.push(req.token.userId);
      }
    }

    sauce
      .save()
      .then((sauce) => {
        res.status(200).json(sauce);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  });
};
