var router = require('express').Router();
var controller = require('./controller.js');

router.get('/signup', controller.signup.get);
router.post('/signup', controller.signup.post);

router.get('/login', controller.login.get);
router.post('/login', controller.login.post);

//Change itinerary in itinerary component view
router.get('/itinerary', controller.itinerary.get);
router.post('/itinerary', controller.itinerary.post);
router.put('/itinerary', controller.itinerary.put);
router.delete('/itinerary', controller.itinerary.delete);

//Itinerary List updates on load and any change to itinerary
router.post('/list', controller.list.post);

//API Calls
router.get('/AutocompleteYelp', controller.api.AutocompleteYelp);
router.get('/ReviewsYelp', controller.api.ReviewsYelp);
router.get('/BusinessYelp', controller.api.BusinessYelp);
router.get('/PhoneSearchYelp', controller.api.PhoneSearchYelp);
router.get('/getAuth2Token', controller.api.getAuth2Token);
router.get('/map', controller.api.map);

// router.get('/*', controller.default);

module.exports = router;