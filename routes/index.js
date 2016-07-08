var express = require('express');
var router = express.Router();
var candies = [
  {"id":1,"name":"Chewing Gum","color":"Red"},
  {"id":2,"name":"Pez","color":"Green"},
  {"id":3,"name":"Marshmallow","color":"Pink"},
  {"id":4,"name":"Candy Stick","color":"Blue"}
  ]
var index=4;

function updateCandy (id, name, color) {
  for (var i=0; i<candies.length; i++)
    if( candies[i].id == id) {
      //update
      candies[i].name = name;
      candies[i].color = color;
      return i;
    }
}

function deleteCandy (id) {
  for (var i=0; i<candies.length; i++)
    if( candies[i].id == id) {
      candies.splice(i,1)
      return
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//index
router.get('/candies', (req,res) => {
    res.status(200).json( {candies} )
});

//show
router.get('/candies/:id', (req,res) => {
    //console.log(req.params.id)
    var candy = [candies[parseInt(req.params.id)-1]]
    res.status(200).json( {candy} )
});


//create
router.post('/candies', (req, res) => {
    // check for wrong color
    if (req.body.color === 'wrong') {
      res.status(422).json({message: 'wrong color'})
    }
    //increase index
    index++;
    //create new candy object
    var new_candy={ "id":index,"name": req.body.name, "color": req.body.color}
    //add to candies array collection
    candies.push(new_candy)
    var candy=[new_candy]
    //respond with this new entry
    res.status(200).json({candy})
});

//update
router.put('/candies/:id', (req,res) => {
    //updateCandy, returns the array index of updated candy
    var i=updateCandy(req.params.id, req.body.name, req.body.color);
    res.status(200).json({candies: [candies[i]] });
});

//destroy
router.delete('/candies/:id', (req,res) => {
    deleteCandy(req.params.id)
    res.status(200).json({message:"deleted"})
});

module.exports = router;
