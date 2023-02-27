const mongoose = require("mongoose")
const schema = mongoose.Schema

const AuthorSchema = schema({
    name:String,
    age:Number
})

module.exports = mongoose.model("Author",AuthorSchema)