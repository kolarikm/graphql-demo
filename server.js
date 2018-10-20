const express = require('express');
const expressGQL = require('express-graphql');
const schema = require('./schema.js');

const PORT = 4000;
const app = express();

app.use('/graphql', expressGQL({
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});