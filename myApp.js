var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {

 let string = `${req.method} ${req.path} - ${req.ip}`
 console.log(string) 
   
  next();

});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}))

/** 1) Meet the node console. */
console.log("Hello World");
//console.log(bodyParser);


/** 2) A first working Express Server */

/**app.get("/", (req, res) => {
  res.send("Hello Express");
})*/
//para que funcionara 11
app.listen(3001, function() {
console.log('Listening on port 3000');
});

/** 4) Serve static assets  */
app.use("/public", express.static(__dirname + "/public"));
/*app.use(express.static(__dirname + '/public/'))*/

/** 3) Serve an HTML file */
/*app.get("/", function(req, res) {
res.sendFile("/views/index.html"  , { root : __dirname})
 });*/
app.get("/", (req, res) => {
  //res.send("Hello Express");
  res.sendFile(__dirname + "/views/index.html");
});

/** 5) serve JSON on a specific route */
/*app.get('/json', (req, res) => {
  let message = 'Hello json'
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    return res.json({"message": message.toUpperCase()})
  }
  return res.status(200).json({"message": message})
})*/
//test a continue
/*app.get("/json", (req, res) => {
res.sendFile(__dirname + "/views/index.html");
  res.json({
    message: "Hello json"
  });
});*/


/** 6) Use the .env file to configure the app */
/**Para test todo los demas puntos deberian estar comentados*/
//console.log(process.env.MESSAGE_STYLE);
//const mySecret = process.env['MESSAGE_STYLE']
//console.log(process.env.MESSAGE_STYLE === "uppercase");

 
app.get('/json', (req, res) => {
  let message = "Hello json";
  if(process.env.MESSAGE_STYLE === "uppercase"){
    message = message.toUpperCase();
  }
  return res.json({"message":message});
});
/**
 let messageObject = {"message": "Hello json"};
app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
     var u_=JSON.parse(JSON.stringify(messageObject ));
     u_.message=u_.message.toUpperCase();
     return res.json(u_);
  } else {
      return res.json(messageObject);
  }
});
*/

 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
/*app.get('/now', function(req,res, next){  
    next();
  }, function(req, res){
   var time =  new Date()
    console.log('time'+time);
    res.json({'time': time});
  }
);*/

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

/** 9)  Get input from client - Route parameters */

/*app.get("/:word/echo", (req, res) => {
  let word = req.params.word
  
  let jsonObj = {echo: word,echo: word};
  res.send(jsonObj);
});*/

app.get("/:word/echo", (req, res) => {
  var { word } = req.params;
  res.json({ echo: word });
});


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/*app.get('/name', (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  
  let jsonObj = { name: `${first} ${last}` };
  res.send(jsonObj);
});*/

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last; 
  var { first: firstName, last: lastName } = req.query;
  res.json({
    name: `${firstName} ${lastName}`
  });
});

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post("/name", function(req, res) {
  //console.log(req.body);
   var fullname = req.body.first + " " + req.body.last;
  //console.log(fullname);
  res.json({ name: `${fullname}` });
});


























 module.exports = app;
