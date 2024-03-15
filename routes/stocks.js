const express = require('express');
const router = express.Router();
const Stocks = require('../models/Stocks');
const Items = require('../models/Items');

router.post('/stock/create', async (req, res) => {
    try {
        
        const { stockItems } = req.fields; // récupérer le tableau d'objets stock depuis le corps de la requête

        await Promise.all(
            stockItems.map(async stockItem => {
                const item = await Items.findById(stockItem.itemId);
                if (!item) {
                    throw new Error(`L'article avec l'ID ${stockItem.itemId} n'existe pas.`);
                }
                item.stock += stockItem.stock;
                await item.save();

                const newStock = new Stocks(stockItem);
                await newStock.save();
            })
        );

        res.json('Stocks enregistrés avec succès');

    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de l'enregistrement des stocks");
  }
});

router.get('/stocks/:itemId', async (req, res) => {

    try {
        const { itemId } = req.params;
        if (!itemId) {
            return res.status(400).json({ message: 'Id is required' });
        }
        const stocks = await Stocks.find({ itemId });
        res.json(stocks);   

    } catch (error) {
        console.log(error)
    }

});


module.exports = router;