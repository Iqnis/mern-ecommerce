import express from 'express';
import { PORT, DB_URL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors
import { Clothes } from './models/clothesModel.js';

const app = express();

// Add express.json() middleware to handle JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS

// Route to get all clothes
app.get('/shopp/clothes', async (req, res) => {
    try {
        const clothes = await Clothes.find();
        return res.status(200).json({
            count: clothes.length,
            data: clothes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
});

// Route to get clothes by id
app.get('/shopp/clothes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const clothes = await Clothes.findById(id);
        
        if (!clothes) {
            return res.status(404).send({ message: 'Clothes not found' });
        }

        return res.status(200).json(clothes);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
});

// Route to update clothes by id
app.put('/shopp/clothes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (
            !req.body.item ||
            !req.body.price ||
            !req.body.description ||
            !req.body.image ||
            !req.body.category
        ) {
            return res.status(400).send({ message: 'Please fill all fields' });
        }

        const updatedClothes = await Clothes.findByIdAndUpdate(id, {
            item: req.body.item,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category
        }, { new: true });

        if (!updatedClothes) {
            return res.status(404).send({ message: 'Clothes not found' });
        }

        return res.status(200).json(updatedClothes);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
});

// Route to add new clothes
app.post('/shopp/clothes', async (req, res) => {
    try {
        if (
            !req.body.item ||
            !req.body.price ||
            !req.body.description ||
            !req.body.image ||
            !req.body.category
        ) {
            return res.status(400).send({ message: 'Please fill all fields' });
        }

        // Create a new clothes item
        const newClothes = new Clothes({
            item: req.body.item,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category
        });

        // Save to the database
        const clothes = await newClothes.save();

        return res.status(201).send(clothes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () =>
            console.log(`Server running on port ${PORT}`)
        );
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

