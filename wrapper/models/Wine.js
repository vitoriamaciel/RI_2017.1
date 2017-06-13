var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Wine = new Schema({
  titulo: {
    type: String,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  uva: {
    type: String,
    required: true
  },
  teorAlcoolico: {
    type: String,
    required: true
  },
  classificacao: {
    type: String,
    required: true
  },
  URL: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Wine', Wine);