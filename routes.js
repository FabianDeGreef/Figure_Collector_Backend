var db = require('./db');
var express = require('express');
var router = express.Router();
var Figure = require('./models/figure');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Z:/Fabian/Project/Images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
  });

var upload = multer({ storage: storage })

router.get('/',(req,res)=> {
    res.send('usage: send request to /api/figures')
});


router.get('/figures',(req,res)=>{
  Figure.find((err,result)=>{
        if(err)
        res.send(err);
        res.json(result);
    });
});

router.get('/figures/:id',(req,res)=>{
  console.log(req.params.id);
  Figure.findById(req.params.id,(err,figure)=>{
    if(err)
      res.send(err);
    res.send(figure);
  })
});

router.post('/figures', (req, res) => {
  let alien = new Figure({
    issue: req.body.issue ,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price ,
    height: req.body.height ,
    edition: req.body.edition ,
    collected: req.body.collected,
    imageUrl: 'http://localhost:3000/static/'+req.body.name.replace(/\s/g, "")+".jpg"
  });
  console.log(alien);


  alien.save((err, alien) => {
      if(err)
          res.send(err);

      res.json(alien);
  });
});

router.put('/figures',(req,res)=>{
    Figure.findById(req.body._id,(err,figure) =>{
      console.log(req)
      figure.issue = req.body.issue ,
      figure.name = req.body.name,
      figure.description = req.body.description,
      figure.price = req.body.price ,
      figure.height = req.body.height ,
      figure.edition = req.body.edition ,
      figure.collected = req.body.collected,
      figure.imageUrl = 'http://localhost:3000/static/'+req.body.name.replace(/\s/g, "")+".jpg"

      figure.save((saveErr, savedFigure)=>{
        if(saveErr)
          res.send(saveErr);
        res.send(savedFigure)
      });
    });
});

router.delete('/figures/:id',(req,res)=>{
  Figure.deleteOne({_id:req.params.id},(err,removed) =>{
    if(err)
      res.send(err);

    res.json(removed);
  });
});
  
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    console.log(err);
    res.send(400);
  }
});



module.exports = router;