const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull    
} = require('graphql');

const db = [
    {id: 1, name: 'John Doe', email: 'jdoe@gmail.com',age: 35},
    {id: 2, name: 'Steve Smith', email: 'stevie@gmail.com',age: 25},
    {id: 3, name: 'Sarah White', email: 'white_s@gmail.com',age: 32},
];

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                for (let i = 0; i < db.length; i++) {
                    if (db[i].id == args.id) {
                        return db[i];
                    }
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parent, args) {
                return db;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});