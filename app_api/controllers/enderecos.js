
var mongoose = require('mongoose');
var modelEndereco = mongoose.model('Endereco');
//var modelCoordinate = mongoose.model("Coordenate");


var sendJsonResponse = function (res, status, content){

    res.status(status);
    res.json(content);

};


module.exports.getEnderecos = function(req, res, next) {
   
    modelEndereco.find({}, function(err, results, stats){
       
        if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        else{
            
            var enderecos = [];
            results.forEach(function (result){
                enderecos.push({
                    logradouro : result._doc.logradouro,
                    numero: result._doc.numero,
                    complemento: result._doc.complemento,
                    bairro: result._doc.bairro,
                    cep : result._doc.cep,
                    siglaFederacao : result._doc.siglaFederacao,
                    cidade : result._doc.cidade,
                    _id: result._doc._id
                });
            });
            sendJsonResponse(res,200,enderecos);

        }
       
    });

};

module.exports.enderecoCreate = function(req, res) {
    
    var newEndereco = new modelEndereco({ 
        
        logradouro : req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cep : req.body.cep,
        siglaFederacao : req.body.siglaFederacao,
        cidade : req.body.cidade
    });

    newEndereco.save(function(err, newEndereco){
        if(err){
            sendJsonResponse(res, 400, err);
        }else{
            sendJsonResponse(res, 201, newEndereco);
        }
    });

};


module.exports.enderecoUpdate = function(req, res) {
    
    if(req.params && req.params.enderecoId){
        modelEndereco.findOne({_id: req.params.enderecoId})
            .exec(function (err, endereco){
                if(!endereco){
                    sendJsonResponse(res,404,{'message' : 'enderecoId not found.'});
                    return;                         
                }else if (err){
                    sendJsonResponse(res,404,err);
                    return;
                }
                else{
                    
                    endereco.logradouro =  req.body.logradouro;
                    endereco.numero =  req.body.numero;
                    endereco.complemento = req.params.complemento;
                    endereco.cep = req.body.cep;
                    endereco.siglaFederacao = req.body.siglaFederacao;
                    endereco.cidade = req.body.cidade;
                    endereco.bairro = req.body.bairro;
        

                    endereco.save(function(err,enderecoUpdated){
                        if(err){
                            sendJsonResponse(res,404,err);
                            return;
                        }else{
                            sendJsonResponse(res,200,enderecoUpdated);
                        }

                    });
                
                }
            
            });

    }else{
        sendJsonResponse(res,404,{'message' : 'No endereco id in body request.'});        
    }
};

module.exports.enderecoDeleteOne = function(req, res) {
    
    if(req.params && req.params.enderecoId){
        modelEndereco.findOne({_id: req.params.enderecoId})
            .exec(function (err, endereco){
                if(!endereco){
                    sendJsonResponse(res,404,{'message' : 'endereco Id not found.'});
                    return;                         
                }else if (err){
                    sendJsonResponse(res,404,err);
                    return;
                }
                else{

                    endereco.remove(function(err,enderecoDeleted){
                        if(err){
                            sendJsonResponse(res,404,err);
                            return;
                        }else{
                            sendJsonResponse(res,200,enderecoDeleted);
                        }

                    });
                
                }
            
            });

    }else{
        sendJsonResponse(res,404,{'message' : 'No endereco id in body request.'});        
    }
};