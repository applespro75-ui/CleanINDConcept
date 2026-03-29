import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, backgroundColor: '#F7FAF8' }}>
                <StatusBar style="dark" />
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="welcome" />
                    <Stack.Screen name="join-or-start" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen
                        name="create-society"
                        options={{ presentation: 'modal', headerShown: false }}
                    />
                    <Stack.Screen
                        name="join-society"
                        options={{ presentation: 'modal', headerShown: false }}
                    />
                    <Stack.Screen name="how-it-works" />
                    <Stack.Screen name="community-guidelines" />
                    <Stack.Screen name="privacy-policy" />
                </Stack>
            </View>
        </SafeAreaProvider>
    );
}
