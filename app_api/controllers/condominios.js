
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
                    nome : result._doc.nome,
                    cnpj: result._doc.cnpj,
                    quantidadeApartamentos : result._doc.quantidadeApartamentos,
                    quantidadeBlocos: result._doc.quantidadeBlocos,
                    quantidadeElevadores: result._doc.quantidadeElevadores,
                    quantidadeVagas: result._doc.quantidadeVagas,
                    id: result._doc._id,
                    
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
       
    });

    newCondominio.save(function(err, newCondominio){
        if(err){
            sendJsonResponse(res, 400, err);
        }else{
            sendJsonResponse(res, 201, newCondominio);
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
        

                    condominio.save(function(err,condominioUpdated){
                        if(err){
                            sendJsonResponse(res,404,err);
                            return;
                        }else{
                            sendJsonResponse(res,200,condominioUpdated);
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
                            sendJsonResponse(res,200,condominioDeleted);
                        }

                    });
                
                }
            
            });

    }else{
        sendJsonResponse(res,404,{'message' : 'No condominio id in body request.'});        
    }
};