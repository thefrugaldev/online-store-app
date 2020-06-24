const {gql} = require('@apollo/client');

export const GET_ALL_PRODUCTS = gql`
  {
    products {
      id
      name
      price
      description
      thumb {
        id
        url
      }
      comments {
        id
        comment
      }
    }
  }
`;
