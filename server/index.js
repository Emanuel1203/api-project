const express = require("express");
const {getAllProducts} = require("../db/queries/products");
const { getProductById, addProduct, updateProduct, removeProduct } = require("../product");

const router = express.Router();

router.get("/products", (req, res, next) => {
    let {id} = req.params;
    
    try{
        let results;

        if(id) {
        let productID = parseInt(id);
        if (isNaN(productID)) {
            res.status(400).json({
                msg: `You must provide a valid ProductID URL parameter.`})
                param: productID,
            });
        } else {
            [results] = await getProductById(productID);
        }
    }else {
    results = await getAllProducts();
    }
   
    res.json(results || {results: 0, msg:`No results were found`});
    } catch (e) {
        next(e);
    }
});

router.post("/products", (req, res, next) => {
    let productDetails = req.body;

    try { 
        let {insertId }= await addProduct(productDetails);
        res.json({insertId, msg: "Successfully added new product."  });
    } catch (e){
        next(e);
    }
});

router.put("/products/:id", (req,res,next) => {
    let {id} = req.params;
    let productDetails = req.body;

    try{
        let productdID = parseInt(id);
        
        if (isNaN(productID)) {
            res.status(400).json({
                msg: `You must provide a valid ProductID URL parameter.`,
                param: productID,
            });

        } else {
            let results = await updateProduct(productDetails, productID);
            res.json({
                id: productID,
                msg: "Successfully updated product in database",
            });
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/products/:id", async (req, res, next) => {
    let {id} = req.params;

    try{
        let productdID = parseInt(id);
        
        if (isNaN(productID)) {
            res.status(400).json({
                msg: `You must provide a valid ProductID URL parameter.`,
                param: productID,
            });

        } else {
            let results = await removeProduct(productID);
            res.json({
                id: productID,
                msg: "Successfully removed product in database",
            }); 
    }
}catch(e) {
    next(e);
}
});

module.exports = router;