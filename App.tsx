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
import {Button} from 'react-native-paper';
import {match} from 'ts-pattern';
import {useState} from 'react';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

function App(): JSX.Element {
  const [load, setLoad] = useState(false);
  const theme = useTheme();

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
    flex: 1,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <SafeAreaView style={backgroundStyle}>
          {match(load)
            .with(true, () => <PhotoList />)
            .with(false, () => (
              <Button
                mode="contained"
                onPress={() => setLoad(true)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{margin: 32}}>
                Load
              </Button>
            ))
            .exhaustive()}
        </SafeAreaView>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
