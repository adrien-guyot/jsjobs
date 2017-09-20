const express = require('express');             // on récupère Express
const app = express();                          // on créé une application en appelant express comme une méthode
const bodyParser = require('body-parser');      // middleware qui permet de récupérer plus tard le résultat de ce qui aura été posté

app.use(bodyParser.json());                     // app.use permet de passer des middlewares, ici on passe le middleware bodyParser.json
                                                // ainsi quand une requête entre, elle subira un traitement qui consistera à parser les données envoyées

const api = express.Router();                   // on créé un router appelé api, à l'aide d'express.Router

api.get('/jobs', (req, res) => {                // le router dispose d'une méthode get qui permet de répondre à une requête get sur un port spécifique
    res.json({success: true, message: 'hello-world'});
});

app.use('/api', api);                           // permet de préfixer le chemin ainsi : localhost:4201/api/jobs

const port=4201;                                // on déclare le port sur lequel on va écouter

app.listen(port, () => {                        // on demande à notre app d'écouter sur le port en question
    console.log(`listening on port ${port}`);   // on indique en callback le port écouté pour le futur dev qui réprendra notre code ^^
});