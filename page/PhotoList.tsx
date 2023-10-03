import axios from 'axios';
import {Card, Text, useTheme} from 'react-native-paper';
import {useQuery} from 'react-query';
import Config from 'react-native-config';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import crashlytics from '@react-native-firebase/crashlytics';
interface Photo {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  description: string;
  urls: {
    regular: string;
  };
  user: {
    username: string;
  };
}

const PhotoList = () => {
  const fetchPhotos = async () => {
    try {
      const response = await axios.get<Photo[]>(
        `https://api.unsplash.com/photos/?client_id=${Config.Access_Key}&per_page=30&page=1&order_by=popular`,
      );
      return response.data;
    } catch (error) {
      crashlytics().recordError(error as Error);
      console.error(error);
    }
  };
  const {data: photos} = useQuery('photos', fetchPhotos);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper}>
        <View style={styles.title}>
          <Text variant="titleLarge" style={styles.titleText}>
            Photo List
          </Text>
        </View>
        {photos?.map(photo => (
          <Card key={photo.id} style={styles.cardContainer}>
            <Card.Cover source={{uri: photo.urls.regular}} />
            <Card.Content>
              <Text variant="bodyLarge" style={styles.userNameText}>
                {photo.user.username}
              </Text>
              <Text variant="bodyMedium">{photo.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
  },
  wrapper: {
    margin: 16,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  titleText: {
    color: '#242424',
  },
  cardContainer: {
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  userNameText: {marginVertical: 16},
});
export default PhotoList;
