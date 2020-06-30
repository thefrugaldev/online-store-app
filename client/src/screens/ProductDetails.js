import React from 'react';
import {StyleSheet, Text, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_PRODUCT, GET_COMMENTS_BY_PRODUCT} from '../graphql/requests';
import {Loading} from '../components/Loading';
import {Error} from '../components/Error';
import {Product} from './Product';
import {Card} from '../components/Card';
import {AddComment} from '../components/AddComment';

export function ProductDetails({route}) {
  const {productId} = route.params;

  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery(GET_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-first',
  });

  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
  } = useQuery(GET_COMMENTS_BY_PRODUCT, {
    variables: {
      productId,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (productLoading) return <Loading />;
  if (productError) return <Error error={error} />;

  const renderComment = ({item: comment}) => {
    return (
      <Card id={comment.id} style={styles.commentCard}>
        <Text>{comment.comment}</Text>
      </Card>
    );
  };

  const renderNumberOfComments = () => {
    return (
      <Text style={styles.title}>
        {commentsData && commentsData.comments.length > 0
          ? `Comments [${commentsData.comments.length}]`
          : `No comments found`}
      </Text>
    );
  };

  const renderHeader = () => {
    const {product} = productData;

    return (
      <>
        <Product product={product} />
        <AddComment productId={product.id} />
        {commentsLoading && <Loading />}
        {commentsError && <Error error={commentsError} />}
        {renderNumberOfComments()}
      </>
    );
  };

  return (
    <FlatList
      data={commentsData ? commentsData.comments : []}
      renderItem={renderComment}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.commentsContainer}
    />
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    padding: 8,
  },
  commentCard: {
    padding: 16,
    marginVertical: 8,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
  },
});
