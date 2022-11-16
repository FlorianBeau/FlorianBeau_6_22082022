const Sauce = require("../models/sauce");
const fs = require("fs");
const { findOneAndDelete } = require("../models/sauce");
const { default: cluster } = require("cluster");

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

  //res.status(200).json({ message: "Récupérer toutes les sauces" });
};

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

exports.postPictureAndSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.token.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.putUpdateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.token.userId) {
        // req.auth auparavant
        res.status(401).json({ message: "Not authorized" });
      } else {
        ////////////////// CODE RAJOUTE ///////////////////
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id });
        });
        ///////////////////////////////////////////////////

        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteById = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.token.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
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

exports.postLike = (req, res, next) => {
  // 1 récupérer la sauce par son ID
  // 2 si utilisateur à aimé la sauce, on ajoute 1 dans likes et son userId dans UserLike
  // 3 si utilisateur n'a pas aimé la sauce, on ajoute 1 dans dislikes et son UserId dans UserDislikes
  // 4 si il retire sa réaction
  // 4.1 = si userId est dans tableau UserLikes on retire le like
  // 4.2 = sinon on retire le dislike

  Sauce.findOne({
    _id: req.params.id,
  }).then((sauce) => {
    //////////////////////////////

    if (req.body.like == 1) {
      // On vérifie si l'usersId est dans le tableau usersLiked
      // si oui = message erreur
      // si non = l'exécution du code continue
      if (sauce.usersLiked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà likée" });
      }
      // On vérifie si l'usersId n'est pas déjà dans le tableau usersLiked, si il n'y est pas, on le
      // rajoute dans le tableau usersLiked et on incrémente le compteur like
      else if (sauce.usersDisliked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà dislikée" });
      } else {
        sauce.likes++;
        sauce.usersLiked.push(req.token.userId);
      }

      /////////////////////////////////////////////////////////////////////
    } else if (req.body.like == 0) {
      // On vérifie si l'utilisateur n'avait ni liké, ni disLiké sa sauce (si son userId est présent
      // dans usersLiked ou usersDisliked). Si oui, on décrémente le compteur et on retire son userId
      // de usersLiked ou usersDisliked.
      if (
        !sauce.usersDisliked.includes(req.token.userId) &&
        !sauce.usersLiked.includes(req.token.userId)
      ) {
        return res.status(400).json({ message: "Requête non authorisée" });
      } else if (sauce.usersDisliked.includes(req.token.userId)) {
        sauce.dislikes--;
        sauce.usersDisliked.splice(
          sauce.usersDisliked.indexOf(req.token.userId),
          1
        );
      } else {
        // Si l'userId est dans les likes
        sauce.likes--;
        sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.token.userId), 1); ////////////////// ????????
      }
    } else if (req.body.like == -1) {
      // On vérifie si l'usersId est dans le tableau usersLiked
      // si oui = message erreur
      // si non = l'exécution du code continue
      if (sauce.usersLiked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà likée" });
      } else if (sauce.usersDisliked.includes(req.token.userId)) {
        return res.status(400).json({ message: "Sauce déjà dislikée" });
        // On vérifie si l'usersId n'est pas déjà dans le tableau usersDisliked, si il n'y est pas, on le
        // rajoute dans le tableau usersLiked et on incrémente le compteur like
      } else {
        sauce.dislikes++;
        sauce.usersDisliked.push(req.token.userId);
      }
    }

    sauce
      .save()
      .then((sauce) => {
        res.status(200).json(sauce);
        console.log(res.sauce);
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
