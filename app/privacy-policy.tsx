import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../constants/Colors';

const SECTIONS = [
    {
        icon: 'phone-portrait-outline' as const,
        color: Colors.primary,
        bg: Colors.primarySurface,
        title: 'What We Collect',
        content: [
            {
                heading: 'Device Identity',
                body: 'We generate a one-way hashed ID from your device. This is not linked to your phone number, email, or name.',
            },
            {
                heading: 'Society Membership',
                body: 'We store which societies you are a member of (max 2). This is required to show you relevant feeds and limit message spam.',
            },
            {
                heading: 'Posts & Messages',
                body: 'Content you post (text, photos) is stored on our servers and visible to all members of your society. It is not shared publicly.',
            },
        ],
    },
    {
        icon: 'eye-off-outline' as const,
        color: '#7C3AED',
        bg: '#F5F3FF',
        title: 'What We Do NOT Collect',
        content: [
            {
                heading: 'Personal Information',
                body: 'We do not collect your real name, phone number, email address, or government ID.',
            },
            {
                heading: 'Location Data',
                body: 'We do not track your GPS location. Your "area" is only what you manually enter during society creation.',
            },
            {
                heading: 'Payment Details',
                body: 'UPI payments are processed directly between residents via their UPI apps. We do not see or store any payment information.',
            },
        ],
    },
    {
        icon: 'server-outline' as const,
        color: '#0891B2',
        bg: '#ECFEFF',
        title: 'Data Storage',
        content: [
            {
                heading: 'Servers',
                body: 'Your data is stored on secure cloud servers located in India, compliant with Indian IT rules.',
            },
            {
                heading: 'Retention',
                body: 'Posts older than 90 days are archived. If you leave a society, your posts remain for community continuity but are no longer attributed to your device ID.',
            },
            {
                heading: 'Deletion',
                body: 'You can request full data deletion by leaving all societies. Your device ID hash is purged within 30 days.',
            },
        ],
    },
    {
        icon: 'share-social-outline' as const,
        color: '#EA580C',
        bg: '#FFF7ED',
        title: 'Data Sharing',
        content: [
            {
                heading: 'Third Parties',
                body: 'We do not sell or share your data with advertisers, data brokers, or any third parties.',
            },
            {
                heading: 'Legal Requests',
                body: 'We may disclose data if required by Indian law enforcement with a valid court order. We will challenge overbroad requests.',
            },
            {
                heading: 'Within Societies',
                body: 'Other society members can see your posts but not your hashed device ID or any other identifying information.',
            },
        ],
    },
    {
        icon: 'lock-closed-outline' as const,
        color: '#16A34A',
        bg: '#F0FDF4',
        title: 'Your Rights',
        content: [
            {
                heading: 'Access',
                body: 'You can view all the data we hold about you through the Profile screen.',
            },
            {
                heading: 'Portability',
                body: 'You can export your posts as a text file from the Profile settings.',
            },
            {
                heading: 'Erasure',
                body: 'Leave all societies and your data will be fully erased within 30 days. No questions asked.',
            },
        ],
    },
];

export default function PrivacyPolicyScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={22} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy & Data</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.heroBanner}>
                    <Ionicons name="shield-checkmark" size={30} color={Colors.primary} />
                    <Text style={styles.heroTitle}>Your Privacy is Our Default</Text>
                    <Text style={styles.heroSubtitle}>
                        Clean India is built on anonymous device identity. We collect the bare minimum to make the app work.
                    </Text>
                </View>

                <Text style={styles.lastUpdated}>Last updated: March 2025 · Version 1.0</Text>

                {SECTIONS.map((section) => (
                    <View key={section.title} style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionIcon, { backgroundColor: section.bg }]}>
                                <Ionicons name={section.icon} size={20} color={section.color} />
                            </View>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>
                        {section.content.map((item, i) => (
                            <View key={i} style={[styles.item, i < section.content.length - 1 && styles.itemBorder]}>
                                <Text style={styles.itemHeading}>{item.heading}</Text>
                                <Text style={styles.itemBody}>{item.body}</Text>
                            </View>
                        ))}
                    </View>
                ))}

                <View style={styles.contactBox}>
                    <Ionicons name="mail-outline" size={18} color={Colors.primary} />
                    <View style={{ flex: 1, gap: 2 }}>
                        <Text style={styles.contactTitle}>Questions about your data?</Text>
                        <Text style={styles.contactBody}>
                            Reach us at{' '}
                            <Text style={styles.contactEmail}>privacy@cleanindia.app</Text>
                            {' '}and we'll respond within 48 hours.
                        </Text>
                    </View>
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
    heroBanner: {
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.xl,
        padding: 24,
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        marginBottom: 8,
    },
    heroTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, textAlign: 'center' },
    heroSubtitle: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
    lastUpdated: {
        fontSize: 11,
        color: Colors.textMuted,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 8,
    },
    section: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    sectionIcon: {
        width: 40,
        height: 40,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.text, flex: 1 },
    item: { paddingVertical: 10 },
    itemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
    },
    itemHeading: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 3 },
    itemBody: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20 },
    contactBox: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        marginTop: 8,
    },
    contactTitle: { fontSize: 13, fontWeight: '700', color: Colors.text },
    contactBody: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
    contactEmail: { color: Colors.primary, fontWeight: '600' },
});
