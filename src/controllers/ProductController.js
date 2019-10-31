const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {

    async index(req, res, next) {
        const { page = 1 } = req.query;
        const products = await Product.paginate({}, { page, limit: 10 });

        return res.json(products);
    },

    async show(req, res) {
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },

    async store(req, res, next) {
        const product = await Product.create(req.body);

        return res.json(product);
    },

    async update(req, res, next) {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(product);
    },

    async destroy(req, res, next) {
        await Product.findByIdAndRemove(req.params.id);

        return res.send();
    },
}