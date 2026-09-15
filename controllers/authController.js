const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Connexion d'un utilisateur
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        // Vérification du mot de passe (haché ou clair pour rétrocompatibilité)
        const isMatch = await bcrypt.compare(password, user.password).catch(() => false) || (user.password === password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '2h' }
        );

        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            return res.redirect('/dashboard');
        }

        res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un utilisateur avec mot de passe haché
exports.createUser = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username || name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/dashboard/users');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/dashboard/users');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard/users');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};