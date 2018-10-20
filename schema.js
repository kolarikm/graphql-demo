const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
        bag: {
            type: new GraphQLList(ItemType)
        }
    })
});

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        name: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/people/${args.id}`)
                    .then(res => res.data);
            }
        },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parent, args) {
                return axios.get(`http://localhost:3000/people`)
                    .then(res => res.data);
            }
        }
    }
});

const modify = new GraphQLObjectType({
    name: 'Modify',
    fields: {
        addPerson: {
            type: PersonType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                return axios.post(`http://localhost:3000/people`, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                    .then(res => res.data);
            }
        },
        removePerson: {
            type: PersonType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                return axios.delete(`http://localhost:3000/people/${args.id}`)
                    .then(res => res.data);
            }
        },
        editPerson: {
            type: PersonType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return axios.patch(`http://localhost:3000/people/${args.id}`, args)
                    .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: modify
});