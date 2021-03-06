const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');
const csvtojson = require("csvtojson");
    

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ml/')
  },
  filename: function (req, file, cb) {
    cb(null, 'csvFile.csv')
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  }

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  
  app.use('ml/', express.static('ml'))
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(allowCrossDomain);

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });

  // DuarfOn API handlers
  app.post('/upload', upload.single('file'), (req, res) => {
    // const { exec, spawn } = require('child_process');
    // exec('source env/bin/activate');
    // spawn('python',["ml/Final.py"]);
    csvtojson()
    .fromFile('ml/predictionResult.csv')
    .then((jsonObj)=>{
        res.send(jsonObj);
    })
  })
}

