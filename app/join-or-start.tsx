import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../constants/Colors';

export default function JoinOrStartScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={22} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Clean India</Text>
                <TouchableOpacity style={styles.helpBtn}>
                    <Text style={styles.helpText}>Help?</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Join or Start a Community</Text>
                <Text style={styles.subtitle}>
                    Coordinate your neighborhood cleanliness. You can manage or join up to 2 societies.
                </Text>

                {/* Create Section */}
                <Text style={styles.sectionLabel}>Start a New Community</Text>
                <TouchableOpacity
                    style={styles.createCard}
                    onPress={() => router.push('/create-society')}
                    activeOpacity={0.9}
                >
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' }}
                        style={styles.createCardImage}
                    />
                    <View style={styles.createCardOverlay} />
                    <View style={styles.createCardContent}>
                        <View style={styles.createCardBadge}>
                            <Text style={styles.createCardBadgeText}>Create a Society</Text>
                        </View>
                        <Text style={styles.createCardDesc}>
                            Set up a new neighborhood zone and invite residents as admin.
                        </Text>
                        <TouchableOpacity
                            style={styles.createNowBtn}
                            onPress={() => router.push('/create-society')}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.createNowText}>Create Now</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Join Section */}
                <Text style={styles.sectionLabel}>Join Existing Society</Text>

                {/* QR Scan */}
                <TouchableOpacity style={styles.qrCard} onPress={() => router.push('/join-society')} activeOpacity={0.9}>
                    <View style={styles.qrIconWrap}>
                        <Ionicons name="qr-code" size={28} color={Colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.qrTitle}>Scan to Join</Text>
                        <Text style={styles.qrSubtitle}>Scan the QR code displayed at your society's entrance or shared by your admin.</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                </TouchableOpacity>

                {/* Code entry */}
                <TouchableOpacity
                    style={styles.codeBtn}
                    onPress={() => router.push('/join-society')}
                    activeOpacity={0.85}
                >
                    <Ionicons name="keypad-outline" size={16} color={Colors.textSecondary} />
                    <Text style={styles.codeBtnText}>Enter Society Code</Text>
                </TouchableOpacity>

                <Text style={styles.supportText}>
                    Need help?{' '}
                    <Text style={styles.supportLink}>Contact Clean India Support</Text>
                </Text>
            </ScrollView>

            {/* Bottom: Go to Home */}
            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                <View style={styles.footerNote}>
                    <Ionicons name="information-circle-outline" size={14} color={Colors.textMuted} />
                    <Text style={styles.footerNoteText}>You need to create or join a society to use the app.</Text>
                </View>
                <TouchableOpacity
                    style={styles.goToAppBtn}
                    onPress={() => router.replace('/(tabs)')}
                    activeOpacity={0.85}
                >
                    <Text style={styles.goToAppText}>Skip for Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    backBtn: { padding: 4 },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.text,
    },
    helpBtn: { padding: 4 },
    helpText: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.text,
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 21,
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 12,
    },
    createCard: {
        borderRadius: Radius.lg,
        overflow: 'hidden',
        height: 180,
        marginBottom: 24,
        ...Shadow.md,
    },
    createCardImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: 180,
    },
    createCardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(20, 90, 45, 0.72)',
    },
    createCardContent: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
    },
    createCardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: Radius.full,
    },
    createCardBadgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    createCardDesc: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        lineHeight: 19,
        flex: 1,
        marginVertical: 8,
    },
    createNowBtn: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: Radius.full,
        alignSelf: 'flex-start',
    },
    createNowText: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.divider,
    },
    dividerText: {
        fontSize: 13,
        color: Colors.textMuted,
        fontWeight: '600',
    },
    qrCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 16,
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 12,
        ...Shadow.sm,
    },
    qrIconWrap: {
        width: 52,
        height: 52,
        borderRadius: Radius.md,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 3,
    },
    qrSubtitle: {
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 17,
    },
    codeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: Radius.lg,
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        marginBottom: 20,
    },
    codeBtnText: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    supportText: {
        fontSize: 12,
        color: Colors.textMuted,
        textAlign: 'center',
    },
    supportLink: {
        color: Colors.primary,
        fontWeight: '600',
    },
    footerNote: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 10,
        paddingHorizontal: 4,
    },
    footerNoteText: {
        fontSize: 12,
        color: Colors.textMuted,
        flex: 1,
        lineHeight: 17,
    },
    footer: {
        paddingHorizontal: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.divider,
    },
    goToAppBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: Radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.md,
    },
    goToAppText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
