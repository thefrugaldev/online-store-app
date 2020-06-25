import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_PRODUCT_DETAILS} from '../graphql/requests';
import {Loading} from '../components/Loading';
import {Error} from '../components/Error';
import {Product} from './Product';

export function ProductDetails({route}) {
  const {productId} = route.params;

  const {data, loading, error} = useQuery(GET_PRODUCT_DETAILS, {
    variables: {
      productId,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return <Product product={data.product} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
