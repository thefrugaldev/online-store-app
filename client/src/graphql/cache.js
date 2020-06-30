import {InMemoryCache} from '@apollo/client';
import {GET_FAVORITE_PRODUCTS_COUNT} from './requests';

export const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        favorite: {
          read(favorite = false) {
            return favorite;
          },
        },
        //Defaults to read method
        price(price) {
          return `$${price}`;
        },
      },
    },
    Query: {
      fields: {
        product(_, {args, toReference}) {
          return toReference({
            __typename: 'Product',
            id: args.id,
          });
        },
      },
    },
  },
});

cache.writeQuery({
  query: GET_FAVORITE_PRODUCTS_COUNT,
  data: {
    favoriteProductsCount: 0,
  },
});
