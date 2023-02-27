const express = require("express")
const dotenv = require("dotenv").config()
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const schema = require("./schema/schema")
const app = express()

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: schema
}))

mongoose.connect(process.env.db,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Database connected")
    }).catch(() => {
        console.log("Database is not connected")
    })

app.listen(3088)

