// 1 CREATION D'UN SERVEUR DE DEVELOPPEMENT (Node)

// Importation package HTTP de Node pour créer un serveur

// Je passe une fonction qui sera exécutée à chaque appel effectué vers ce serveur
// "CreateServer" démarre un serveur Node basique

const http = require("http");
const app = require("./app");

app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
