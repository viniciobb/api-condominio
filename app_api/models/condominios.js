var mongoose =require('mongoose');

var enderecoSchema = new mongoose.Schema({
    
    nomeLogradouro: {type: String, required: true},
    numero: {type: Number, default: 0},
    complemento: String,
    bairro: {type: String, required: true},
    cep: {type: Number, required: true},
    siglaFederacao: {type: String, required: true},
    cidade: {type: String, required: true}

});


var authorSchema = new mongoose.Schema({
    
    firstName: {type: String, required: true},
    LastName: {type: String},
    ID: {type: String, required: true}

});

var facilitySchema = new mongoose.Schema({
    
    nomefacility: {type: String, required: true},
    tipoReserva: {type: String, required: true, default: 'DIA'}, // dia ou hora
    disponibilidadeDia: { type: String }, // S T Q Q S S D
    disponibilidadeHora: { type: String }, // 1 2 3 4 5 6 7 8 9 10 11 12  : am pm
    valor: {type: Number, default: 0 }
});

var condominioSchema = new mongoose.Schema({
    
    nome: {type: String, required: true},
    cnpj: {type: Number, default: 0},
    quantidadeApartamentos: {type: Number, default: 0},
    endereco: [enderecoSchema],
    facilities: [facilitySchema]

});

// var reviewSchema = new mongoose.Schema({
//     author: String,
//     rating: {type: Number , 'default': 0 , min: 0 , max: 5},
//     reviewText: String,
//     createOn: {type: Date, "default": Date.now}
    
// });

// var coordenateSchema = new mongoose.Schema({
//     name : { type : String, require: true }, 
//     // name : { type: String, "default" : 0 } para estabelecer valores default  
//     coords : {type : [Number], index: '2dsphere'}
//     // index 2dsphere -> mongo faz cálculos geométricos baseados em um objeto esférico->  geoJSON -> longitude/latitude 
// });

// var locationSchema = new mongoose.Schema({
//     name : { type : String, require: true }, 
//     // name : { type: String, "default" : 0 } para estabelecer valores default  
//     address: String, 
//     rating: {type: Number , default: 0 , min: 0 , max: 5},
//     facilities: [String],
//     coords : {type : [Number], index: '2dsphere', require: true},
//     openingTimes : [openingTimeSchema],
//     reviews : [reviewSchema]

//     // index 2dsphere -> mongo faz cálculos geométricos baseados em um objeto esférico->  geoJSON -> longitude/latitude 
// });

//mongoose.model('Condominio', condominioSchema);
mongoose.model('Author', authorSchema);
