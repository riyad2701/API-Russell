const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: { type: Number },
    catwayType: { type: String },
    type: { type: String },
    catwayState: { type: String }
}, {
    timestamps: true,
    strict: false // Permet de lire tous les champs du JSON sans blocage
});

module.exports = mongoose.model('Catway', catwaySchema);
