
var mongoose = require('mongoose');
// var modelLocation = mongoose.model("Location");
// var modelCoordinate = mongoose.model("Coordenate");
var modelAuthor = mongoose.model('Author');
 

var sendJsonResponse = function (res, status, content){

    res.status(status);
    res.json(content);

};

module.exports.getAuthors = function(req, res, next) {
   
    modelAuthor.find({}, function(err, results, stats){
       
        if(err){
            sendJsonResponse(res,404,err);
            return;
        }
        else{

            var authors = [];
            results.forEach(function (result){
                authors.push({
                    firstName : result._doc.firstName,
                    lastName: result._doc.lastName,
                    id: result._doc.id,
                    _id: result._doc._id
                });
            });
            sendJsonResponse(res,200,authors);

        }
       
    });

};

module.exports.authorCreate = function(req, res) {
    
    var newAuthor = new modelAuthor({ 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id

    });

    newAuthor.save(function(err, newAuthor){
        if(err){
            sendJsonResponse(res, 400, err);
        }else{
            sendJsonResponse(res, 201, newAuthor);
        }
    });

};

module.exports.authorUpdate = function(req, res) {
    
    if(req.params && req.params.authorId){
        console.log(req.params.authorId);
        modelAuthor.findOne({id: req.params.authorId})
            .exec(function (err, author){
                if(!author){
                    sendJsonResponse(res,404,{'message' : 'authorId not found.'});
                    return;                         
                }else if (err){
                    sendJsonResponse(res,404,err);
                    return;
                }
                else{
                    
                    author.firstName =  req.body.firstName;
                    author.lastName =  req.body.lastName;
                    author.id = req.params.authorId;

                    author.save(function(err,authorUpdated){
                        if(err){
                            sendJsonResponse(res,404,err);
                            return;
                        }else{
                            sendJsonResponse(res,200,authorUpdated);
                        }

                    });
                
                }
            
            });

    }else{
        sendJsonResponse(res,404,{'message' : 'No author id in body request.'});        
    }
};
