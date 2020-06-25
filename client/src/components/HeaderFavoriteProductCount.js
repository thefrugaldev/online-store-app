import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_FAVORITE_PRODUCTS_COUNT} from '../graphql/requests';
import {Loading} from './Loading';

export function HeaderFavoriteProductCount() {
  const {data, loading, error} = useQuery(GET_FAVORITE_PRODUCTS_COUNT);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data.favoriteProductsCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'orange',
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
