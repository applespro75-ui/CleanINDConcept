import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../constants/Colors';

const SECTIONS = [
    {
        icon: 'heart-outline' as const,
        color: '#DB2777',
        bg: '#FDF2F8',
        title: 'Respect Every Resident',
        rules: [
            'Treat all members with dignity, regardless of how they maintain their property.',
            'No personal attacks, name-calling, or harassment — digital or otherwise.',
            'Debate issues, not people. Focus on the problem, not the person.',
            'Be especially considerate of elderly residents and those with disabilities.',
        ],
    },
    {
        icon: 'camera-outline' as const,
        color: '#0891B2',
        bg: '#ECFEFF',
        title: 'Posting Issues Responsibly',
        rules: [
            'Post photos of the issue location, not of residents or private property.',
            'Describe the problem clearly — area, frequency, severity.',
            'Do not post the same issue repeatedly — use the existing thread.',
            'Mark resolved issues as RESOLVED once the clean-up is done.',
        ],
    },
    {
        icon: 'chatbubbles-outline' as const,
        color: '#EA580C',
        bg: '#FFF7ED',
        title: 'Message Limit (3/day)',
        rules: [
            'You have 3 messages per day to keep conversations focused.',
            'Use them for actionable posts: reports, updates, and announcements.',
            'Do not use messages for casual chitchat — use WhatsApp for that.',
            'Admins may have additional permissions during active drives.',
        ],
    },
    {
        icon: 'wallet-outline' as const,
        color: Colors.primary,
        bg: Colors.primarySurface,
        title: 'Clean-Up Pool & Funds',
        rules: [
            'Participation in the monthly pool is voluntary.',
            'Funds collected go directly to workers hired through the marketplace.',
            'Admins must share receipts or proof after every drive.',
            'Never pressure residents to contribute beyond their means.',
        ],
    },
    {
        icon: 'sync-circle-outline' as const,
        color: '#7C3AED',
        bg: '#F5F3FF',
        title: 'Admin Responsibilities',
        rules: [
            'Admins serve for 30 days and then power rotates to another resident.',
            'Admins cannot delete posts — only pin or mark them as resolved.',
            'Admin must initiate at least one clean-up drive per month.',
            'Abuse of admin power will result in early rotation.',
        ],
    },
    {
        icon: 'ban-outline' as const,
        color: '#DC2626',
        bg: '#FEF2F2',
        title: 'Zero Tolerance',
        rules: [
            'No content that is political, religious, or communal in nature.',
            'No spam, advertisements, or promotional content.',
            'No false reports intended to target or harass a specific resident.',
            'Violations will result in removal from the society.',
        ],
    },
];

export default function CommunityGuidelinesScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={22} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Community Guidelines</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.heroBanner}>
                    <Ionicons name="people-outline" size={30} color={Colors.primary} />
                    <Text style={styles.heroTitle}>Building Trust Together</Text>
                    <Text style={styles.heroSubtitle}>
                        These guidelines ensure Clean India remains a safe, constructive, and respectful space for every resident.
                    </Text>
                </View>

                {SECTIONS.map((section) => (
                    <View key={section.title} style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.sectionIcon, { backgroundColor: section.bg }]}>
                                <Ionicons name={section.icon} size={20} color={section.color} />
                            </View>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>
                        {section.rules.map((rule, i) => (
                            <View key={i} style={styles.ruleRow}>
                                <View style={[styles.ruleDot, { backgroundColor: section.color }]} />
                                <Text style={styles.ruleText}>{rule}</Text>
                            </View>
                        ))}
                    </View>
                ))}

                <View style={styles.footer}>
                    <Ionicons name="information-circle-outline" size={16} color={Colors.textMuted} />
                    <Text style={styles.footerText}>
                        These guidelines apply to all members of every society on the Clean India platform. Last updated March 2025.
                    </Text>
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
        marginBottom: 24,
    },
    heroTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, textAlign: 'center' },
    heroSubtitle: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20 },
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
    ruleRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    ruleDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, flexShrink: 0 },
    ruleText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20, flex: 1 },
    footer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: Colors.surfaceAlt,
        borderRadius: Radius.md,
        marginTop: 8,
    },
    footerText: { flex: 1, fontSize: 12, color: Colors.textMuted, lineHeight: 18 },
});
