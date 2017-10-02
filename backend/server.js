const express = require('express');             // on récupère Express
const app = express();                          // on créé une application en appelant express comme une méthode
const bodyParser = require('body-parser');      // middleware qui permet de récupérer plus tard le résultat de ce qui aura été posté
let data = require('./jobs');                   // permet de récupérer le contenu des données que l'on a exporté dans jobs.js

let initialJobs = data.jobs;
let addedJobs = [];

users = [
    { id: 1, email: 'tu@test.fr', nickname: 'Tutu', password: 'aze', role: 'admin' },
    { id: 2, email: 'tu2@test.fr', nickname: 'Tutu2', password: 'qsd', role: 'user' }
];
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
}

app.use(bodyParser.json());                     // app.use permet de passer des middlewares, ici on passe le middleware bodyParser.json
                                // ainsi quand une requête entre, elle subira un traitement qui consistera à parser les données envoyées

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // permet au serveur d'accepter de répondre au client Angular malgré leur différence de n° de port
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

const api = express.Router();                   // on créé un router appelé api, à l'aide d'express.Router
const auth = express.Router();

auth.post('/login', (req, res) => {
    if (req.body) {                                                         // on teste si on a bien reçu les données du form
        const email = req.body.email.toLocaleLowerCase();                   // on récupère l'email et le password
        const password = req.body.password.toLocaleLowerCase();
        const index = users.findIndex(user => user.email === email);        // grâce à la méthode findIndex, on recherche dans notre tableau
                                                                        // de users qu'un enregistrement match avec l'email qui a été posté

        if (index > -1 && users[index].password === password) {             // on teste si l'index trouvé est viable et que les passwords côtés client & serveur matchent
            let user = users[index];                                        // on récupère les données de l'utilisateur 
            let token = '';                                                 // on initialise notre token à vide
            if (user.email === 'tu@test.fr') {                              // on teste si l'email de l'utilisateur correspond à celui de l'admin   
            // on renvoie le token spé admin    
            token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email, nickname: user.nickname }, secret);  
            } else {                                                        // sinon on renvoie le token spé user
                token = jwt.sign({ iss: 'http://localhost:4201', role: 'user', email: req.body.email, nickname: user.nickname }, secret);
            }
            res.json({ success: true, token: token });
        } else {  // si le match des passwords est nok, on retourne un flag à false avec le token et un status "utilisateur non authentifié"
            res.status(401).json({ success: false, message: 'identifiants incorrects' });
        }
    } else {      // si on a pas reçu les données du form, on retourne un flag à false avec err msg avec un status "erreur serveur"
        res.status(500).json({ success: false, message: 'données manquantes' });
    }
})

auth.post('/register', (req, res) => {
    console.log('req.body', req.body);
    if (req.body) {
        const email = req.body.email.toLocaleLowerCase().trim();
        const password = req.body.password.toLocaleLowerCase().trim();
        const nickname = req.body.nickname.trim();
        users = [{ id: Date.now(), email: email, password: password }, ...users];
        res.json({ success: true, users: users });
    } else {
        res.json({ success: false, message: "la création a échoué" });
    }
})

api.get('/jobs', (req, res) => {                // le router dispose d'une méthode get qui permet de répondre à une requête get sur un port spécifique
    // res.json( data.jobs );
    res.json(getAllJobs());
});

// Création d'un MiddleWare pour imposer une connexion aux personnes qui veulent faire un post sur /jobs
const checkUserToken = (req, res, next) => {
    //Authorization: Bearer azeazeazeazeaze
    if(!req.header('authorization')){     // on test la présence d'une header authorization dans la requête qui est renvoyée
        // s'il n'y a pas de header authorization, on renvoie un statut invalide avec un message d'info
        return req.status(401).json({success: false, message: "Le header d'authentification est manquant"});
    }

    const authorizationParts = req.header('authorization').split(' ');
    let token = authorizationParts[1]; // on split authorization pour récupérer azeazeaze... qui est le token
    console.log ('token', token);
    // le serveur vérifie ainsi le jwt avec le tokem ET le secret
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ success: false, message: "Token non valide"});
        } else {
            console.log('decodedToken', decodedToken);
            next(); // l'utilisateur a fournit un token valide donc le next est valable
        }
    }); 

}; 

/* Gestion du post concernant l'ajout d'un job, en ajoutant un middleware en deuxième paramètre de la route, cela aura pour conséquence
de vérifier qu'il y ait bien un header*/
api.post('/jobs', checkUserToken, (req, res) => {               
    console.log('************************');
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('total number of jobs : ' + getAllJobs().length);
    res.json(job);
})

api.get('/search/:term/:place?', (req, res) => {        // Gestion du get concernant la recherche de jobs
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;

    let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
    if (place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
    }
    res.json({ success: true, jobs });
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);     // on parse l'id à récupérer pour parcourir l'api
    const job = getAllJobs().filter(j => j.id === id);
    if (job.length === 1) {
        res.json({ success: true, job: job[0] });
    } else {
        res.json({ success: false, message: `Pas de job ayant pour id ${id}` });
    }
})

app.use('/api', api);                           // permet de préfixer le chemin ainsi : localhost:4201/api/jobs
app.use('/auth', auth);                         // permet de préfixer le chemin ainsi : localhost:4201/auth/

const port = 4201;                                // on déclare le port sur lequel on va écouter

app.listen(port, () => {                        // on demande à notre app d'écouter sur le port en question
    console.log(`listening on port ${port}`);   // on indique en callback le port écouté pour le futur dev qui réprendra notre code ^^
});