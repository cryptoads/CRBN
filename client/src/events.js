var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const bodyParser = require('body-parser');
const axios = require('axios');

/* Event Search API */ 

router.get('/', (req, res) => {
  axios.get(`https://www.eventbriteapi.com/v3/organizers/${process.env.ORGANIZER_ID}/events?token=${U3YLKXTSA4YFB5DPHHMS}`)
  .then( res => console.log(res)
})
