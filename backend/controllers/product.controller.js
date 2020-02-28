const Product = require('../models/product.model')
const Joi = require('@hapi/joi')

exports.productCreate = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        barcode: Joi.string()
            .alphanum()
            // .min(10)
            // .max(10)
            .allow(''),

        category: Joi.string()
            .allow(''),
        cost: Joi.number()
            .allow('')
            .min(1)
            .required()
            .default(0),
        price: Joi.number()
            .allow('')
            .min(1)
            .required()
            .default(0),
        stock: Joi.number()
            .allow('')
            .min(0)
            .required()
            .default(0),
        unit: Joi.string()
            .allow(''),
        fileName: Joi.string()
            .allow(''),
        imageData: Joi.object().
            allow()

    })
    try {
        const value = await schema.validateAsync(req.body)
        let product = new Product({
            name: value.name,
            barcode: value.barcode,
            category: value.category,
            cost: value.cost,
            price: value.price,
            stock: value.stock,
            unit: value.unit,
            fileName: value.fileName,
            imageData: value.imageData
        })

        console.log("line 49 : ", req.body)

        product.save((err) => {
            if (err) {
                return next(err)
            }
            res.send('Product Created successfully!!')
        })
    }
    catch (err) { return next(err) + console.log("err : ", err) }
}


exports.productDetailsAll = (req, res, next) => {
    Product.find(req.params.id, (err, product) => {
        if (err) return next(err)
        res.send(product)
    })

    // Product.find(req.params.id, function (err, product) {
    //     if (err) return next(err);
    //     // Prints "Space Ghost is a talk show host".
    //     product.map((obj) => {
    //         console.log("obj : ", obj.name)
    //     })
    //     res.send(product)
    //     // console.log(' %s is a ', product);

    //     // console.log(' %s is a name.', product.name);
    // });

    // Product.find(req.params.id,
    //     { "name": req.body.name }, function (err, product) {
    //         if (err) return next(err);
    //         // Prints "Space Ghost is a talk show host".
    //         product.map((obj) => {
    //             console.log("obj : ", obj.name)
    //         })
    //         res.send(product)
    //     }
    // );
}

exports.productDetail = (req, res, next) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return next(err)
        res.send(product)
    })
}

exports.productUpdate = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, product) => {
        if (err) return next(err)
        // console.log("Update : ", res.body)
        res.send('Product udpated.')
        console.log("Product : ", product)
    })

}

exports.productPatch = (req, res, next) => {
    Product.replaceOne(req.params.id, { $set: req.body }, (err, product) => {
        if (err) return next(err)
        res.send('Product udpated.')
    })
}

exports.productDelete = (req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err)
        res.send('Deleted successfully!')
    }).then(() => {
    })
}