var express = require('express');
var bodyParser = require("body-parser");
var uuidv1 = require('uuid/v1');
var app = express();

var port = process.env.npm_package_config_port || 7777;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let services = [
  { id: uuidv1(), name: 'Замена стекла', price: 21000, content: 'Стекло оригинал от Apple'},
  { id: uuidv1(), name: 'Замена дисплея', price: 25000, content: 'Дисплей оригинал от Foxconn'},
  { id: uuidv1(), name: 'Замена аккумулятора', price: 4000, content: 'Новый на 4000 mAh'},
  { id: uuidv1(), name: 'Замена микрофона', price: 2500, content: 'Оригинальный от Apple'},
];

function getRandomInt(min, max) {
  let result =  Math.floor(Math.random() * (max - min)) + min;
  return result;
}

function theErrorIsComing(res){
  if (!(getRandomInt(0, 666) % 13)){
    console.log(`theErrorIsComing`);
    res.statusMessage = "The error is coming.";
    res.statusCode = 500;
    res.end()
    return true;
  }
  return false;

}

async function theDelayIsComing(process,delay){

  let isDelayed = false;
  if (!(getRandomInt(0, 9) % getRandomInt(0, 9)) || delay ){
    await new Promise(resolve => {
      const timeout = delay || getRandomInt(1, 1 * 1000); 
      console.log(`theDelayIsComing ${timeout}`);
      setTimeout(() => {
          resolve();
      }, timeout);
    })
    isDelayed = true;
  }
  process();
  return isDelayed;
}

app.get('/', async function (req, res) {
  res.send(`
    LLC
  `);
});



app.get('/services', async function (req,res) {
    theErrorIsComing(res) || theDelayIsComing( () => {
      res.send(services.map( o => { return {...o, content: undefined } }));
    });
});

app.post('/services/:serviceId',function (req,res) {
  const {serviceId} = req.params;
  theErrorIsComing(res) || theDelayIsComing( () => {
    const {id = serviceId, name, price, content} = req.body;
    console.log(`saveing:${id}`);
    services = [
      ...services.filter( o => o.id !== id ),
      {
        id: services.filter( o => o.id !== id ).length > 0 ? id : uuidv1() ,
        name,
        price,
        content
      }
    ];
    res.send({
      'code': 0,
      'message': 'Successfully complete',
    });
  });

});

app.get('/services/:serviceId', async function (req,res) {
  theErrorIsComing(res) || theDelayIsComing( () => {
    const {serviceId} = req.params;
    console.log(`getting:${serviceId}`);
	    const found = services.filter( o => o.id === serviceId );
	    console.log(`found:${found.length}`);
	    if (found.length > 0){
	      res.send(found[0]);
	    }
	    else{
	      res.statusMessage = "The error is coming.";
	      res.statusCode = 404;
	      res.end()
	    }
  });
});

app.delete('/services/:serviceId', function (req,res) {

  theErrorIsComing(res) || theDelayIsComing( () => {
    const {serviceId} = req.params;
    console.log(`deleting:${serviceId}`);
    
    console.log(`getting:${serviceId}`);
	    const found = services.filter( o => o.id === serviceId );
	    console.log(`found:${found.length}`);
	    if (found.length > 0){
	      res.send(found[0]);
	    }
	    else{
	      res.statusMessage = "The error is coming.";
	      res.statusCode = 404;
	      res.end()
	    }

    res.send({
      'code': 0,
      'message': 'Successfully complete',
    });

  }, 3000);
});


app.listen(port, function () {
  console.log(`Notes server running on port:${port}`);
});