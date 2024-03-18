const express = require('express');
const router = express.Router();
const Items = require('../models/Items');
const slugify = require('slugify');

router.post('/items/create', async ({ fields }, res) => {
    const { name, brand, model, category, stock, newStock, serialNumber, editing } = fields;
    
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }

    const item = new Items({ name, slug: slugify(name), brand, model, category, stock, newStock, serialNumber, editing });

    try {
        await item.save();
        res.json(item);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/item/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, brand, model, category, stock, serialNumber } = req.fields;

    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }

    try {
        const updatedItem = await Items.findByIdAndUpdate(id, { name, brand, model, category, stock, serialNumber }, { new: true });
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/items', async (req, res) => {
    try {
        const items = await Items.find().lean();
        res.json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/item/delete/:id', async (req, res) => {
    try { 
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Id is required' });
        }

        const deletedItem = await Items.findByIdAndDelete(id);
        res.json(deletedItem);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;