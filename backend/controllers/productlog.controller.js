const ProductLog = require('../models/productlog.model')
const Product = require('../models/product.model');
const Joi = require('@hapi/joi');

exports.productLogCreate = async (req, res, next) => {
    const schema = Joi.object({
        seqNo: Joi.number()
            .allow(''),
        user: Joi.object(),
        docNo: Joi.string(),
        createAt: Joi.date(),
        productEditList: Joi.array()
    })
    try {
        const value = await schema.validateAsync(req.body);
        let productLog = new ProductLog(
            {
                seqNo: value.seqNo,
                user: value.user,
                docNo: value.docNo,
                createAt: value.createAt,
                productEditList: value.productEditList
            }
        )
        productLog.save(async (err) => {
            if (err) {
                return next(err);
            }
            var pded = value.productEditList
            for (let i = 0; i < pded.length; i++) {
                const e = await pded[i];
                Product.findByIdAndUpdate(e._id, { $set: { stock: e.changeStock } }, (err, product) => {
                    if (err) return next(err)
                })
            }
            res.send('ProductLog Created successfully')
        })
    }
    catch (err) { return next(err) }
}

exports.productDetailsAll = (req, res, next) => {
    ProductLog.find(req.params.id, (err, productLog) => {
        // console.log('ProductLog1: ', productLog)
        if (err) return next(err)
        res.send(productLog)
    })
};

exports.productDetail = (req, res, next) => {
    ProductLog.findById(req.params.id, (err, product) => {
        if (err) return next(err)
        res.send(product)
    })
}
