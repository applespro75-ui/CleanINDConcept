import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabIconProps = {
    name: keyof typeof Ionicons.glyphMap;
    focused: boolean;
    label: string;
};

function TabIcon({ name, focused, label }: TabIconProps) {
    return (
        <View style={styles.tabItem}>
            <Ionicons
                name={name}
                size={22}
                color={focused ? Colors.tabBarActive : Colors.tabBarInactive}
            />
            <Text
                style={[styles.tabLabel, focused && styles.tabLabelActive]}
                numberOfLines={1}
                adjustsFontSizeToFit
            >
                {label}
            </Text>
        </View>
    );
}

function CustomTabBar() {
    const insets = useSafeAreaInsets();
    return null; // used for computed height only
}

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const tabBarHeight = 60 + Math.max(insets.bottom, 8);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.tabBar,
                    borderTopWidth: 1,
                    borderTopColor: Colors.border,
                    height: tabBarHeight,
                    paddingBottom: Math.max(insets.bottom, 8),
                    paddingTop: 8,
                    elevation: 12,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                },
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} label="Home" />
                    ),
                }}
            />
            <Tabs.Screen
                name="society"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? 'people' : 'people-outline'} focused={focused} label="Society" />
                    ),
                }}
            />
            <Tabs.Screen
                name="market"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? 'storefront' : 'storefront-outline'} focused={focused} label="Market" />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} label="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: Colors.tabBarInactive,
        textAlign: 'center',
        width: 60,
    },
    tabLabelActive: {
        color: Colors.tabBarActive,
        fontWeight: '700',
    },
});
