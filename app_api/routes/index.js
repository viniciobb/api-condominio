
var express = require('express');
var routerApi = express.Router();

//var ctrEnderecos = require('../controllers/endereco');
var ctrAuthors = require('../controllers/authors');
var ctrEnderecos = require('../controllers/enderecos');
var ctrCondominios = require('../controllers/condominios');

//var ctrlLocations = require('../controllers/locations');
//var ctrlReviews = require('../controllers/reviews');

/* locations */

//routerApi.get('/locations', ctrlLocations.locationsListByDistance);

//routerApi.get('/enderecos', ctrEnderecos.listarEnderecos);

// localhost:3000/api-condominio/authors
routerApi.get('/authors', ctrAuthors.getAuthors);
routerApi.post('/author', ctrAuthors.authorCreate);
routerApi.put('/authors/:authorId', ctrAuthors.authorUpdate);
routerApi.delete('/authors/:authorId', ctrAuthors.authorDeleteOne);

//localhost:3000/api-condominio/condominio/enderecos
routerApi.get('/condominios/enderecos', ctrEnderecos.getEnderecos);
routerApi.post('/condominio/endereco', ctrEnderecos.enderecoCreate);
routerApi.put('/condominios/enderecos/:enderecoId', ctrEnderecos.enderecoUpdate);
routerApi.delete('/condominios/enderecos/:enderecoId', ctrEnderecos.enderecoDeleteOne);

routerApi.get('/condominios', ctrCondominios.getCondominios);
routerApi.post('/condominio', ctrCondominios.condominioCreate);
routerApi.put('/condominios/:condominioId', ctrCondominios.condominioUpdate);
routerApi.delete('/condominios/:condominioId', ctrCondominios.condominioDeleteOne);

//routerApi.put('/locations/:locationId', ctrlLocations.locationsUpdateOne);
//routerApi.get('/locations/:locationId', ctrlLocations.locationsReadOne);



/* reviews */

//routerApi.post('/locations/:locationId/reviews', ctrlReviews.reviewsCreate);
//routerApi.get('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsReadOne);
//routerApi.put('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsUpdateOne);
//routerApi.delete('/locations/:locationId/reviews/:reviewId', ctrlReviews.reviewsDeleteOne);


module.exports = routerApi;