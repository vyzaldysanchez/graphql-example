const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');
const gql = require('graphql-tag');
const fetch = require('node-fetch');

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql', fetch }),
  cache: new InMemoryCache(),
});

apolloClient
  .query({
    query: gql`
      query PokemonType {
        pokemonType(id: 1) {
          pokemons {
            name
            url
            slot
          }
          name
        }
      }
    `,
  })
  .then(response => console.log(JSON.stringify(response, null, 2)))
  .catch(console.error);
