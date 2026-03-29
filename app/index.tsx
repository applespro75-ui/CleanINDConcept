import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: Math.max(insets.top + 20, 60), paddingBottom: Math.max(insets.bottom + 20, 40) }]}>
            <StatusBar style="dark" />

            {/* Background circles */}
            <View style={styles.bgCircle1} />
            <View style={styles.bgCircle2} />

            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoOuter}>
                        <Image source={require('../assets/cilogo.png')} style={styles.logoImage} />
                    </View>
                </View>

                {/* Brand Name */}
                <Text style={styles.brandName}>CLEAN INDIA</Text>

                {/* Tagline */}
                <Text style={styles.tagline}>One QR. One Community.{'\n'}One Clean Corner at a Time.</Text>

                {/* Description */}
                <Text style={styles.description}>
                    Help us coordinate neighborhood cleanliness.{'\n'}
                    Connect with societies and workers to{'\n'}
                    keep your community spotless through{'\n'}
                    smart QR management.
                </Text>
            </View>

            {/* Bottom */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/welcome')}
                    activeOpacity={0.85}
                >
                    <Text style={styles.primaryButtonText}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/how-it-works')} activeOpacity={0.7}>
                    <Text style={styles.learnLink}>Learn How It Works</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
    },
    bgCircle1: {
        position: 'absolute',
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: Colors.primarySurface,
        top: -80,
        right: -80,
        opacity: 0.7,
    },
    bgCircle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.primarySurface,
        bottom: 80,
        left: -60,
        opacity: 0.5,
    },
    content: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    logoContainer: {
        marginBottom: 28,
    },
    logoOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.md,
    },
    logoImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
    },

    brandName: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.primary,
        letterSpacing: 3,
        marginBottom: 12,
    },
    tagline: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 280,
    },
    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: Radius.full,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.md,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    learnLink: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
});
