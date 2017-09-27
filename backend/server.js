const express = require('express');             // on récupère Express
const app = express();                          // on créé une application en appelant express comme une méthode
const bodyParser = require('body-parser');      // middleware qui permet de récupérer plus tard le résultat de ce qui aura été posté
let data = require('./jobs');                   // permet de récupérer le contenu des données que l'on a exporté dans jobs.js

let initialJobs = data.jobs;
let addedJobs = [];

users = [];
const fakeUser = {id: 1, email: 'tu@test.fr', password: 'aze'};
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';
const jwt = require('jsonwebtoken');

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
}

app.use(bodyParser.json());                     // app.use permet de passer des middlewares, ici on passe le middleware bodyParser.json
                                                // ainsi quand une requête entre, elle subira un traitement qui consistera à parser les données envoyées

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  // permet au serveur d'accepter de répondre au client Angular malgré leur différence de n° de port
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const api = express.Router();                   // on créé un router appelé api, à l'aide d'express.Router
const auth = express.Router();

auth.post('/login', (req, res) => {
    if (req.body){                                                              // on teste si on a bien reçu les données du form
        const email = req.body.email.toLocaleLowerCase();                             // on récupère l'email et le password
        const password = req.body.password.toLocaleLowerCase();
        if (email === fakeUser.email && password === fakeUser.password){        // on compare les données au fakeUser
            delete req.body.password;
            //res.json({success: true, data: req.body});                          // si cond ok, on retourne un flag à true avec la req
            const token = jwt.sign({ iss: 'http://localhost:4201', role:'admin', email: req.body.email }, secret);
            res.json({success: true, token: token});
        } else {
            res.json({success: false, message: 'identifiants incorrects'});     // si cond nok, on retourne un flag à false avec err msg
        }
    } else {
        res.json({success: false, message: 'données manquantes'});
    }
})

auth.post('/register', (req, res) => {
    console.log('req.body', req.body);
    if(req.body){
        const email = req.body.email.toLocaleLowerCase().trim();
        const password = req.body.password.toLocaleLowerCase().trim();
        const confirmedPassword = req.body.password.toLocaleLowerCase();
        users = [{id: Date.now(), email: email, password: password}, ...users];
        res.json({success: true, users: users});
    }else{
        res.json({success:false, message: "la création a échoué"});
    }
})

api.get('/jobs', (req, res) => {                // le router dispose d'une méthode get qui permet de répondre à une requête get sur un port spécifique
    // res.json( data.jobs );
    res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {               // Gestion du post concernant l'ajout d'un job
    console.log('************************');
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('total number of jobs : ' + getAllJobs().length);
    res.json(job);
})

api.get('/search/:term/:place?', (req, res) => {        // Gestion du get concernant la recherche de jobs
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
 
    let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term) ));
    if (place){
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
    }
    res.json({success: true, jobs});
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);     // on parse l'id à récupérer pour parcourir l'api
    const job = getAllJobs().filter(j => j.id === id);
    if (job.length === 1) {
        res.json({success: true, job: job[0]});
    } else {
        res.json({success: false, message: `Pas de job ayant pour id ${id}`});
    }
} )

app.use('/api', api);                           // permet de préfixer le chemin ainsi : localhost:4201/api/jobs
app.use('/auth', auth);                         // permet de préfixer le chemin ainsi : localhost:4201/auth/

const port=4201;                                // on déclare le port sur lequel on va écouter

app.listen(port, () => {                        // on demande à notre app d'écouter sur le port en question
    console.log(`listening on port ${port}`);   // on indique en callback le port écouté pour le futur dev qui réprendra notre code ^^
});