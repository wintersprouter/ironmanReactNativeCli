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
        `https://api.unsplash.com/photos/?client_id=${Config.Access_Key}&per_page=15&page=1&order_by=popular`,
      );
      return response.data;
    } catch (error) {
      crashlytics().recordError(error);
      console.error(error);
    }
  };
  const {data: photos} = useQuery('photos', fetchPhotos);
  const theme = useTheme();
  return (
    <SafeAreaView style={{margin: 16}}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 36,
          }}>
          <Text variant="titleLarge" style={{color: theme.colors.onTertiary}}>
            Photo List
          </Text>
        </View>
        {photos?.length === 0 && <Text>No</Text>}
        {photos?.map(photo => (
          <Card
            key={photo.id}
            style={{
              marginBottom: 16,
              backgroundColor: theme.colors.outlineVariant,
            }}>
            <Card.Cover source={{uri: photo.urls.regular}} />
            <Card.Content>
              <Text variant="bodyLarge" style={{marginVertical: 16}}>
                {photo.user.username}t
              </Text>
              <Text variant="bodyMedium">{photo.description}t</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default PhotoList;
