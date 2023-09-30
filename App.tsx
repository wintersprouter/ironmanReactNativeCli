/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import * as React from 'react';
import {useTheme} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';

import PhotoList from './page/PhotoList';
const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

function App(): JSX.Element {
  const theme = useTheme();

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
    flex: 1,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <SafeAreaView style={backgroundStyle}>
          <PhotoList />
        </SafeAreaView>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
