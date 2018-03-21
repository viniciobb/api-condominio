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
    lastName: {type: String},
    id: {type: String, required: false}

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
    quantidadeBlocos: {type: Number, default: 0},
    quantidadeElevadores: {type: Number, default: 0},
    quantidadeVagas: {type: Number, default: 0},
    endereco: [enderecoSchema],
    facilities: [facilitySchema]

});


mongoose.model('Author', authorSchema);
mongoose.model('Condominio', condominioSchema);
mongoose.model('Endereco', enderecoSchema);
mongoose.model('facility', facilitySchema);
