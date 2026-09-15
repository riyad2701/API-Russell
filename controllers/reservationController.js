const Reservation = require('../models/Reservation');

// Récupérer toutes les réservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une réservation par ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idRecord);
        if (!reservation) return res.status(404).json({ message: 'Réservation introuvable' });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer une réservation
exports.createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation({
            catwayNumber: req.body.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        await newReservation.save();
        res.redirect('/dashboard/reservations');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.idRecord || req.params.id);
        res.redirect('/dashboard/reservations');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

