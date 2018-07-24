var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const bodyParser = require('body-parser');


/* GET home page. */
router.get('/*', function(req, res, next) {
     if(req.isAuthenticated()){
        res.send('this works')
     }else{
        res.send('no workie')
     }

})
module.exports = router;
