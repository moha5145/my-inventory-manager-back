const express = require('express');
const router = express.Router();
const Categories = require('../models/Categories');

router.get('/categories', async (req, res) => {
    try {
        const categories = await Categories.find().lean();
        res.json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.post('/category/create', async ({ fields: { value, newCategory, userId, editing } }, res) => {
    try {
        const category = new Categories({
            label: value.charAt(0).toUpperCase() + value.slice(1),
            value,
            newCategory,
            editing,
            userId
        });
        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/category/update/:id', async ({ params: { id }, fields: { newValue } }, res) => {
    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }

    const firstLaterToUpperString = newValue.charAt(0).toUpperCase() + newValue.slice(1);

    try {
        const category = await Categories.findByIdAndUpdate(id, {
            label: firstLaterToUpperString,
            value: newValue,
        }, { new: true });

        res.json(category);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
    
});

router.delete('/category/delete/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }

    try {
        const category = await Categories.findByIdAndDelete(id);
        res.json(category);
    } catch (error) {
        console.log('error', error);
        return res.status(500).json(error);
    }
});

module.exports = router;