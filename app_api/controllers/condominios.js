
var mongoose = require('mongoose');
var modelCondominio = mongoose.model('Condominio');
//var modelCoordinate = mongoose.model("Coordenate");


var sendJsonResponse = function (res, status, content){

    res.status(status);
    res.json(content);

};


module.exports.getCondominios = function(req, res, next) {
   
    modelCondominio.find({}, function(err, results, stats){
       
        if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        else{
            
            var condominios = [];
            results.forEach(function (result){
                condominios.push({
                    id: result._doc._id,    
                    nome : result._doc.nome,
                    cnpj: result._doc.cnpj,
                    quantidadeApartamentos : result._doc.quantidadeApartamentos,
                    quantidadeBlocos: result._doc.quantidadeBlocos,
                    quantidadeElevadores: result._doc.quantidadeElevadores,
                    quantidadeVagas: result._doc.quantidadeVagas,
                    enderecos: result._doc.enderecos,
                    facilities: result._doc.facilities
                });
            });
            sendJsonResponse(res,200,condominios);

        }
       
    });

};

module.exports.condominioCreate = function(req, res) {
    
    var newCondominio = new modelCondominio({ 
        
        nome : req.body.nome,
        cnpj: req.body.cnpj,
        quantidadeApartamentos : req.body.quantidadeApartamentos,
        quantidadeBlocos: req.body.quantidadeBlocos,
        quantidadeElevadores: req.body.quantidadeElevadores,
        quantidadeVagas: req.body.quantidadeVagas,
        enderecos: req.body.enderecos,
        facilities: req.body.facilities
    });

    newCondominio.save(function(err, newCondominio){
        if(err){
            sendJsonResponse(res, 400, err);
        }else{
            
            var condominio = {
                nome : newCondominio.nome,
                cnpj: newCondominio.cnpj,
                quantidadeApartamentos : newCondominio.quantidadeApartamentos,
                quantidadeBlocos: newCondominio.quantidadeBlocos,
                quantidadeElevadores: newCondominio.quantidadeElevadores,
                quantidadeVagas: newCondominio.quantidadeVagas,
                id: newCondominio._id,
                enderecos: newCondominio.enderecos,
                facilities: newCondominio.facilities
            };
            
            sendJsonResponse(res, 201, condominio);
        }
    });

};


module.exports.condominioUpdate = function(req, res) {
    
    if(req.params && req.params.condominioId){
        modelCondominio.findOne({_id: req.params.condominioId})
            .exec(function (err, condominio){
                if(!condominio){
                    sendJsonResponse(res,404,{'message' : 'condominio Id not found.'});
                    return;                         
                }else if (err){
                    sendJsonResponse(res,404,err);
                    return;
                }
                else{
                    
                    condominio.nome = req.body.nome;
                    condominio.cnpj= req.body.cnpj;
                    condominio.quantidadeApartamentos = req.body.quantidadeApartamentos;
                    condominio.quantidadeBlocos= req.body.quantidadeBlocos;
                    condominio.quantidadeElevadores= req.body.quantidadeElevadores;
                    condominio.quantidadeVagas= req.body.quantidadeVagas;
                    condominio.enderecos= req.body.enderecos;   
                    condominio.facilities= req.body.facilities;   

                    condominio.save(function(err,condominioUpdated){
                        if(err){
                            sendJsonResponse(res,404,err);
                            return;
                        }else{
                              
                            var condominio = {
                                nome : condominioUpdated.nome,
                                cnpj: condominioUpdated.cnpj,
                                quantidadeApartamentos : condominioUpdated.quantidadeApartamentos,
                                quantidadeBlocos: condominioUpdated.quantidadeBlocos,
                                quantidadeElevadores: condominioUpdated.quantidadeElevadores,
                                quantidadeVagas: condominioUpdated.quantidadeVagas,
                                id: condominioUpdated._id,
                                enderecos: condominioUpdated.enderecos,
                                facilities: condominioUpdated.facilities
                            };

                            sendJsonResponse(res,200,condominio);
                        }

                    });
                
                }
            
            });

    }else{
        sendJsonResponse(res,404,{'message' : 'No condominio id in body request.'});        
    }
};

module.exports.condominioDeleteOne = function(req, res) {
    
    if(req.params && req.params.condominioId){
        modelCondominio.findOne({_id: req.params.condominioId})
            .exec(function (err, condominio){
                if(!condominio){
                    sendJsonResponse(res,404,{'message' : 'condominio Id not found.'});
                    return;                         
                }else if (err){
                    sendJsonResponse(res,404,err);
                    return;
                }
                else{

                    condominio.remove(function(err,condominioDeleted){
                        if(err){
                            sendJsonResponse(res,404,err);
                            return;
                        }else{
                            
                            var condominio = {
                                nome : condominioDeleted.nome,
                                cnpj: condominioDeleted.cnpj,
                                quantidadeApartamentos : condominioDeleted.quantidadeApartamentos,
                                quantidadeBlocos: condominioDeleted.quantidadeBlocos,
                                quantidadeElevadores: condominioDeleted.quantidadeElevadores,
                                quantidadeVagas: condominioDeleted.quantidadeVagas,
                                id: condominioDeleted._id,
                                enderecos: condominioDeleted.enderecos,
                                facilities: condominioDeleted.facilities
                                
                            };

                            sendJsonResponse(res,200,condominio);
                        }

                    });
                
                }
            
            });

    }else{
        sendJsonResponse(res,404,{'message' : 'No condominio id in body request.'});        
    }
};