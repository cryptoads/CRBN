var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const bodyParser = require('body-parser');


/* GET home page. */
router.get('/test', function(req, res, next) {
     if(req.isAuthenticated()){
       models.user.findById(req.user,{
       }).then((data)=>{res.json(data)})
     }else{
        res.send('no workie')
     }
})

router.post('/*', function(req, res, next){
    if(req.isAuthenticated()){

    }
})

module.exports = router;
