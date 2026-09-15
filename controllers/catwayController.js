const Catway = require('../models/Catway');

const getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCatwayByNumber = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCatway = async (req, res) => {
    try {
        const newCatway = new Catway(req.body);
        await newCatway.save();
        res.status(201).json(newCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCatway = async (req, res) => {
    try {
        const updatedCatway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            { catwayState: req.body.catwayState },
            { new: true }
        );
        if (!updatedCatway) return res.status(404).json({ message: 'Catway introuvable' });
        res.status(200).json(updatedCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCatway = async (req, res) => {
    try {
        const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        if (!deletedCatway) return res.status(404).json({ message: 'Catway introuvable' });
        res.status(200).json({ message: 'Catway supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCatways,
    getCatwayByNumber,
    createCatway,
    updateCatway,
    deleteCatway
};

// Créer un catway
exports.createCatway = async (req, res) => {
    try {
        const newCatway = new Catway({
            catwayNumber: req.body.catwayNumber,
            type: req.body.type,
            catwayState: req.body.catwayState
        });
        await newCatway.save();
        res.redirect('/dashboard/catways');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Modifier un catway
exports.updateCatway = async (req, res) => {
    try {
        await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            { catwayState: req.body.catwayState },
            { new: true }
        );
        res.redirect('/dashboard/catways');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
    try {
        await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        res.redirect('/dashboard/catways');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
