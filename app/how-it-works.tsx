import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../constants/Colors';

const STEPS = [
    {
        step: '01',
        icon: 'qr-code' as const,
        title: 'One QR per Society',
        description:
            'Each neighborhood or galli gets a unique QR code. The founder prints it and sticks it at the entrance like a digital pinboard for your community.',
        color: Colors.primary,
        bg: Colors.primarySurface,
    },
    {
        step: '02',
        icon: 'scan-outline' as const,
        title: 'Scan to Join Instantly',
        description:
            'Residents scan the QR code with the App. No signup forms, no OTP, no passwords. Your device becomes your secure, anonymous identity.',
        color: '#7C3AED',
        bg: '#F5F3FF',
    },
    {
        step: '03',
        icon: 'chatbubbles-outline' as const,
        title: '3 Messages per Day',
        description:
            'Every member gets 3 posts per day to prevent spam, So Use them wisely report issues with photos, share proofs, or make announcements.',
        color: '#EA580C',
        bg: '#FFF7ED',
    },
    {
        step: '04',
        icon: 'sync-circle-outline' as const,
        title: 'Admin Rotates Every 30 Days',
        description:
            'Admin power rotates among long standing members automatically. This prevents power concentration and builds community trust.',
        color: '#0891B2',
        bg: '#ECFEFF',
    },
    {
        step: '05',
        icon: 'wallet-outline' as const,
        title: 'Micro Clean-Up Pool',
        description:
            'Admin initiates a cleanup drive. Members contribute ₹20–₹100 via UPI. Funds go directly to local workers hired through the Worker Marketplace.',
        color: '#16A34A',
        bg: '#F0FDF4',
    },
    {
        step: '06',
        icon: 'construct-outline' as const,
        title: 'Worker Marketplace',
        description:
            'Local cleaners and volunteers can list themselves. Society members can find and hire them directly by area, availability, and specialty no middlemen.',
        color: '#B45309',
        bg: '#FFFBEB',
    },
    {
        step: '07',
        icon: 'camera-outline' as const,
        title: 'Before / After Proof',
        description:
            'After a cleanup, any member uploads a before and after photo. The community sees the impact immediately building motivation for the next drive.',
        color: '#DB2777',
        bg: '#FDF2F8',
    },
    {
        step: '08',
        icon: 'shield-checkmark-outline' as const,
        title: 'Anonymous & Secure',
        description:
            'No real names required. Your device ID is encrypted. You can join up to 2 societies. Leave anytime your data doesn\'t persist on our servers.',
        color: Colors.primary,
        bg: Colors.primarySurface,
    },
];

export default function HowItWorksScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={22} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>How It Works</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {/* Hero */}
                <View style={styles.hero}>
                    <View style={styles.heroIconWrap}>
                        <Ionicons name="leaf" size={32} color={Colors.primary} />
                    </View>
                    <Text style={styles.heroTitle}>Simple. Local. Effective.</Text>
                    <Text style={styles.heroSubtitle}>
                        Clean India connects your neighborhood through a single QR code — no bureaucracy, no complicated apps.
                    </Text>
                </View>

                {/* Steps */}
                {STEPS.map((item, idx) => (
                    <View key={item.step} style={styles.stepCard}>
                        <View style={[styles.stepIconBox, { backgroundColor: item.bg }]}>
                            <Ionicons name={item.icon} size={24} color={item.color} />
                        </View>
                        <View style={styles.stepBody}>
                            <View style={styles.stepTitleRow}>
                                <Text style={[styles.stepNum, { color: item.color }]}>{item.step}</Text>
                                <Text style={styles.stepTitle}>{item.title}</Text>
                            </View>
                            <Text style={styles.stepDesc}>{item.description}</Text>
                        </View>
                        {idx < STEPS.length - 1 && (
                            <View style={styles.connector}>
                                <Ionicons name="chevron-down" size={14} color={Colors.border} />
                            </View>
                        )}
                    </View>
                ))}

                {/* CTA */}
                <View style={styles.ctaCard}>
                    <Ionicons name="rocket-outline" size={28} color={Colors.primary} />
                    <Text style={styles.ctaTitle}>Ready to start ?</Text>
                    <Text style={styles.ctaSubtitle}>
                        Create your neighborhood society in under 60 seconds or scan a QR to join one.
                    </Text>
                    <TouchableOpacity
                        style={styles.ctaBtn}
                        onPress={() => router.push('/welcome')}
                        activeOpacity={0.87}
                    >
                        <Text style={styles.ctaBtnText}>Get Started</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 56,
        paddingBottom: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.text },
    scroll: { paddingHorizontal: 20, paddingTop: 24 },
    hero: {
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 16,
    },
    heroIconWrap: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        ...Shadow.sm,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    stepCard: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: 16,
        marginBottom: 4,
        flexDirection: 'row',
        gap: 14,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    stepIconBox: {
        width: 48,
        height: 48,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    stepBody: { flex: 1 },
    stepTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
    stepNum: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
    stepTitle: { fontSize: 14, fontWeight: '800', color: Colors.text, flex: 1 },
    stepDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
    connector: {
        position: 'absolute',
        bottom: -14,
        left: 37,
        zIndex: 1,
    },
    ctaCard: {
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.xl,
        padding: 28,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        gap: 10,
    },
    ctaTitle: { fontSize: 20, fontWeight: '800', color: Colors.text },
    ctaSubtitle: {
        fontSize: 13,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    ctaBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: Radius.full,
        marginTop: 6,
        ...Shadow.md,
    },
    ctaBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
