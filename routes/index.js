var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const bodyParser = require('body-parser');

router.use(bodyParser({urlencoded:true}))

/* GET home page. */
router.get('/test', function(req, res, next) {
     if(req.isAuthenticated()){
       models.user.findById(req.user,{
       }).then((data)=>{res.json({data, loggedIn: true})})
     }else{
        res.json({loggedIn: false})
     }
})


router.get('/test/:id', function(req, res, next) {
    const id = Number(req.params.id);
    models.user.findById(id,{})
    .then((data)=>{res.json({data, loggedIn: false})
    })
})

router.post('/updateInfo', function(req, res, next){

    let mpg = Number(req.body.formData.mpg);
    let milesDriven = Number(req.body.formData.milesDriven);
    let maintenance = req.body.formData.maintenance;
    let zip = Number(req.body.formData.zip);
    let gasBill = Number(req.body.formData.gasBill);
    let electricBill = Number(req.body.formData.electricBill);
    let recycling = req.body.formData.recycling;

    if(req.isAuthenticated()){
        models.user.update({
        'mpg': mpg,
        'miles_driven': milesDriven,
        'maintenance': maintenance,
        'zip': zip,
        'natgas_bill': gasBill,
        'electric_bill': electricBill,
        'recycling': recycling,
    },{
        where: {
            id: req.user,
        }
    }).then(user => {
        res.json({'success': true});
    })
  }else{
    res.send('You need to login!')
  }  
})


module.exports = router;
