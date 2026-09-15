require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

// Import des modèles
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');

// Import des routes API
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connexion à MongoDB
connectDB();

// Configuration du moteur de rendu EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use('/catways', catwayRoutes);
app.use('/catways/:id/reservations', reservationRoutes);
app.use('/reservations', reservationRoutes);
app.use('/api/auth', authRoutes);

// Routes HTML
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('index'));
app.get('/dashboard', (req, res) => res.render('dashboard'));

app.get('/dashboard/catways', async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways', { catways });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des catways");
    }
});

app.get('/dashboard/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('reservations', { reservations });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des réservations");
    }
});

app.get('/dashboard/users', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des utilisateurs");
    }
});

const methodOverride = require('method-override');

// À placer avec les autres middlewares (après express.urlencoded)
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
