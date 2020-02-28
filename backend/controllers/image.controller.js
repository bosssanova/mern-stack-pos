var Image = require('../models/image.model')

exports.CreatImage = (req, res, next) => {
    // console.log(req.body)
    const newImage = new Image({
        fileName: req.body.fileName,
        imageData: req.body.imageData
    })

    newImage.save()
        .then((result) => {
            console.log("Result : ",result)
            res.status(200).json({
                success: true,
                document: result
            })
        })
        .catch((err) => next(err))
}

exports.imageDetail = (req, res, next) => {
    Image.find(req.params.id, (err, image) => {
        if (err) return next(err)
        res.send(image)
    })
}