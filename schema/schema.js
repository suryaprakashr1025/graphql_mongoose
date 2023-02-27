const graphql = require("graphql")
const _ = require("lodash")

const books = require("../models/book")
const authors = require("../models/author")

// const books = [
//     { name: "book1", genre: "genre1", id: "1",authorId:"1" },
//     { name: "book2", genre: "genre2", id: "2",authorId:"1" },
//     { name: "book3", genre: "genre3", id: "3",authorId:"3" },
// ]

// const authors = [
//     { name: "author1", age: 24, id: "1" },
//     { name: "author2", age: 25, id: "2" },
//     { name: "author3", age: 26, id: "3" },
// ]

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt
} = graphql

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author:{
            type:AuthorType,
            resolve(parent,args){
                // return _.find(authors,{id:parent.authorId})
            
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
            
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // return _.find(books, { id: args.id })
            
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: (parent, args) => {
                // return _.find(authors, { id: args.id })
                
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve:(parent,args)=>{
                // return books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve:(parent,args)=>{
                 return authors.find({});
            }

        }

    }
})

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{
                    type:GraphQLString
                },
                age:{
                    type:GraphQLInt
                }
            },
            resolve:(parent,args)=>{
                const CreateAuthor =  new authors({
                    name:args.name,
                    age:args.age
                })
                return CreateAuthor.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{
                    type:GraphQLString
                },
                genre:{
                    type:GraphQLString
                },
                authorId:{
                    type:GraphQLID
                }
            },
            resolve(parent,args){
                const createBook = new books({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return createBook.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})