const axios = require('axios');
const {
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');

const getTypes = id =>
  axios
    .get(`https://pokeapi.co/api/v2/type/${id}`)
    .then(response => response.data);

const Pokemon = new GraphQLObjectType({
  name: 'Pokemon',
  description: '...',
  fields: () => ({
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    slot: { type: GraphQLInt },
  }),
});

const PokemonType = new GraphQLObjectType({
  name: 'PokemonType',
  description: '...',
  fields: () => ({
    pokemons: {
      type: new GraphQLList(Pokemon),
      resolve: root =>
        root.pokemon.map(({ pokemon, slot }) => ({ ...pokemon, slot })),
    },
    name: { type: GraphQLString },
  }),
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      pokemonType: {
        type: PokemonType,
        args: { id: { type: GraphQLInt } },
        resolve: (_root, args) => getTypes(args.id),
      },
    }),
  }),
});
