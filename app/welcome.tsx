import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../constants/Colors';

export default function WelcomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: Math.max(insets.top + 16, 40), paddingBottom: Math.max(insets.bottom + 20, 30) }]}>
            <View style={styles.header}>
                <Text style={styles.appName}>Clean India</Text>
                <TouchableOpacity style={styles.infoBtn}>
                    <Ionicons name="information-circle-outline" size={22} color={Colors.textMuted} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Logo accent */}
                <View style={styles.logoWrap}>
                    <View style={styles.logoCircle}>
                        <Image source={require('../assets/cilogo.png')} style={styles.logoImage} />
                    </View>
                    <View style={styles.leafDot1} />
                    <View style={styles.leafDot2} />
                </View>

                <Text style={styles.welcome}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                    We use secure device identity to log you{'\n'}
                    in instantly. No passwords or OTPs{'\n'}
                    required, ensuring your anonymity and{'\n'}
                    security.
                </Text>

                {/* Security badges */}
                <View style={styles.badges}>
                    <View style={styles.badge}>
                        <Ionicons name="shield-checkmark" size={16} color={Colors.primary} />
                        <Text style={styles.badgeText}>Encrypted Identity</Text>
                    </View>
                    <View style={styles.badge}>
                        <Ionicons name="person" size={16} color={Colors.primary} />
                        <Text style={styles.badgeText}>No Personal Data Stored</Text>
                    </View>
                    <View style={styles.badge}>
                        <Ionicons name="flash" size={16} color={Colors.primary} />
                        <Text style={styles.badgeText}>Instant Access</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottom}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.push('/join-or-start')}
                    activeOpacity={0.85}
                >
                    <Ionicons name="shield-checkmark" size={18} color="#FFF" style={{ marginRight: 8 }} />
                    <Text style={styles.primaryBtnText}>Continue Securely</Text>
                </TouchableOpacity>

                <Text style={styles.terms}>
                    By continuing, you agree to our{' '}
                    <Text style={styles.link}>Community Guidelines</Text>
                    {' '}and{' '}
                    <Text style={styles.link}>Privacy Policy</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 28,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    appName: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.text,
    },
    infoBtn: {
        padding: 4,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrap: {
        position: 'relative',
        marginBottom: 32,
    },
    logoCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.md,
    },
    logoImage: {
        width: 96,
        height: 96,
        borderRadius: 48,
        resizeMode: 'cover',
    },

    leafDot1: {
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.primaryLight,
        top: 0,
        right: -4,
        opacity: 0.6,
    },
    leafDot2: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
        bottom: 4,
        left: -4,
        opacity: 0.4,
    },
    welcome: {
        fontSize: 26,
        fontWeight: '800',
        color: Colors.text,
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    badges: {
        gap: 12,
        width: '100%',
        maxWidth: 280,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    badgeText: {
        fontSize: 14,
        color: Colors.text,
        fontWeight: '500',
    },
    bottom: {
        alignItems: 'center',
        gap: 14,
    },
    primaryBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: Radius.full,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.md,
    },
    primaryBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    terms: {
        fontSize: 12,
        color: Colors.textMuted,
        textAlign: 'center',
        lineHeight: 18,
    },
    link: {
        color: Colors.primary,
        fontWeight: '600',
    },
});
