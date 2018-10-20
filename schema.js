const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

const PersonType = new GraphQLObjectType({
    name: 'Person',
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

module.exports = new GraphQLSchema({
    query: RootQuery
});