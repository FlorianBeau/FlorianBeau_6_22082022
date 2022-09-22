// Récupère la librairie "Express" pour gérer plus facilement des requêtes http côté backend
const express = require("express");

// Récupère la fonction "body-parser" pour transformer une demande en objet Javascript
const bodyParser = require("body-parser");

// Récupère la librairie Mongoose qui crée une connexion entre MongoDB et Node.js
const mongoose = require("mongoose");

// Enregistrement des Products dans la base de données
const Product = require("./models/product");

// Connecte la librairie Mongoose à la base de données noSQL "MongoDB"
mongoose
  .connect(
    "mongodb+srv://FloleDev6942:Sbq3yueQAjI1sJLO@cluster0.vyoctbw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

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

// Retournera tous les produits sous la forme{ products: Product[] }
app.get("/api/products", (req, res, next) => {
  Product.find()
    .then((products) => res.status(200).json({ products })) ////////////////////////////////
    .catch((error) => res.status(400).json({ error }));
});

// Retournera le produit avec le_id fourni sous la forme { product: Product }
app.get("/api/products/:id", (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch((error) => res.status(404).json({ error }));
});

// Créera un nouveau Product dans la base de données.
app.post("/api/products", (req, res, next) => {
  delete req.body._id;
  const product = new Product({
    ...req.body,
  });
  product
    .save()
    .then(() => res.status(201).json({ product: product }))
    .catch((error) => res.status(400).json({ error }));
});

// Route permettant la modification d'un produit (modèle "Product" avec la méthode "updateOne")
app.put("/api/products/:id", (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Modified !" }))
    .catch((error) => res.status(400).json({ error }));
});

// Supprimera le produit avec le _id fourni. Retournera un objet de la forme { message: 'Deleted!' }
app.delete("/api/products/:id", (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted !" }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;

// ?
app.use(express.json()); // intercèpte les requêtes contenant du json et les renvois vers l'objet req.body
