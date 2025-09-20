import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({

    Quicksand:require('../assets/fonts/Quicksand-VariableFont_wght.ttf'),
    Montserrat:require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    Questrial:require('../assets/fonts/Questrial-Regular.ttf'),
    lexend:require('../assets/fonts/Lexend-VariableFont_wght.ttf'),
    outfit:require('../assets/fonts/Outfit-VariableFont_wght.ttf'),
    comfortaa:require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),





  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
