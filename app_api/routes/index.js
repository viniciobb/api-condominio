
var express = require('express');
var routerApi = express.Router();

var ctrEnderecos = require('../controllers/endereco');

//var ctrlLocations = require('../controllers/locations');
//var ctrlReviews = require('../controllers/reviews');

/* locations */

//routerApi.get('/locations', ctrlLocations.locationsListByDistance);

routerApi.get('/enderecos', ctrEnderecos.listarEnderecos);

//http://localhost:3000/api.loc8r.com/location
//routerApi.post('/location', ctrlLocations.locationsCreate);

//routerApi.get('/locations/:locationId', ctrlLocations.locationsReadOne);
//routerApi.put('/locations/:locationId', ctrlLocations.locationsUpdateOne);
//routerApi.delete('/locations/:locationId', ctrlLocations.locationsDeleteOne);

/* reviews */

//routerApi.post('/locations/:locationId/reviews', ctrlReviews.reviewsCreate);
//routerApi.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
//routerApi.put('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsUpdateOne);
//routerApi.delete('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsDeleteOne);


module.exports = routerApi;