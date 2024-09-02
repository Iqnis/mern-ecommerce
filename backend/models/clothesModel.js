import mongoose from 'mongoose';

const clothesSchema = mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }
);

export const Clothes = mongoose.model('Clothes', clothesSchema);
