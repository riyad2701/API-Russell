require('dotenv').config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const catwayRoutes = require('../routes/catwayRoutes');

const app = express();
app.use(express.json());
app.use('/catways', catwayRoutes);

describe('Tests des routes Catways', () => {

    // Augmente le timeout à 30 secondes et charge process.env.MONGO_URI
    beforeAll(async () => {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/port_russell';
        await mongoose.connect(uri);
    }, 30000);

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('devrait récupérer la liste des catways', async () => {
        const res = await request(app).get('/catways');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('devrait renvoyer 404 pour un catway inexistant', async () => {
        const res = await request(app).get('/catways/999999');
        expect(res.statusCode).toEqual(404);
    });
});
