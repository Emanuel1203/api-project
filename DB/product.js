const QueryDB = require("../models");

const getAllProducts = async () => {
return await QueryDB("SELECT * FROM products;");
};

const getProductsById = async (id) => {
    return await QueryDB("SELECT * FROM products Where ProductID = ?", [id]);
};

const addProduct = async (productDetails) => {
    return await QueryDB("INSERT INTO products SET ?", [productDetails])
}

const updateProduct = async (productDetails) => {
    return await QueryDB("UPDATE products SET ? WHERE ProductID = ?", [productDetails, id
    productDetails,
    id,
    ]);
};

const removeProduct = async (id) => {
    return await QueryDB("DELETE FROM products Where ProductID = ?", [id]);
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    removeProduct,
};