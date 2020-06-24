import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_ALL_PRODUCTS} from '../graphql/requests';

export function ProductsList({navigation}) {
  const {data, error, loading} = useQuery(GET_ALL_PRODUCTS);

  if (loading || error) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.products}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
