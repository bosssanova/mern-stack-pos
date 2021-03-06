const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const app = express()
const path = require('path')
let cors = require('cors')

const users = require("../routes/user.route")
const product = require('../routes/product.route')
const productlog = require('../routes/productlog.route')
const image = require('../routes/image.route')

const port = process.env.PORT || 4000

app.use(cors())
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
// DB Config
const db = require("../config/keys").mongoURI
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err))

mongoose.set('useFindAndModify', false);

// Passport config
require("../config/passport")(passport)
// Passport middleware
app.use(passport.initialize())

app.use('/uploads', express.static('uploads'))

// Routes

app.use("/users", users)
app.use('/products', product)
app.use('/productlog', productlog)
app.use("/image", image)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(port, () => console.log(`Server up and running on port ${port} !`))
