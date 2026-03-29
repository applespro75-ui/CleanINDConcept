import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../../constants/Colors';
import { MOCK_USER, MOCK_SOCIETIES, MOCK_ALERTS } from '../../constants/MockData';

export default function HomeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.safe, { paddingTop: insets.top }]}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={styles.greeting}>Hello, {MOCK_USER.name}</Text>
                            <Ionicons name="leaf" size={18} color={Colors.primary} />
                        </View>
                        <Text style={styles.greetingSub}>Manage your neighborhood cleanliness.</Text>
                    </View>
                    <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/notifications')}>
                        <Ionicons name="notifications-outline" size={22} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Action Required */}
                <Text style={styles.sectionTitle}>ACTION REQUIRED</Text>
                <View style={styles.alertsContainer}>
                    {MOCK_ALERTS.map((alert) => (
                        <View key={alert.id} style={styles.alertCard}>
                            <View
                                style={[
                                    styles.alertIcon,
                                    { backgroundColor: alert.type === 'election' ? Colors.warningLight : Colors.primarySurface },
                                ]}
                            >
                                <Ionicons
                                    name={alert.type === 'election' ? 'sync-circle' : 'wallet-outline'}
                                    size={18}
                                    color={alert.type === 'election' ? Colors.warning : Colors.primary}
                                />
                            </View>
                            <View style={styles.alertBody}>
                                <Text style={styles.alertTitle}>{alert.title}</Text>
                                <Text style={styles.alertDesc} numberOfLines={2}>{alert.description}</Text>
                            </View>
                            <TouchableOpacity style={styles.alertAction}>
                                <Text style={styles.alertActionText}>{alert.action}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* My Societies */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>MY SOCIETIES</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>

                {MOCK_SOCIETIES.map((soc) => (
                    <TouchableOpacity key={soc.id} style={styles.societyCard} activeOpacity={0.9}>
                        <Image source={{ uri: soc.image }} style={styles.societyCardImage} />
                        <View style={styles.societyCardOverlay} />
                        <View style={styles.societyCardContent}>
                            <View style={styles.societyCardTop}>
                                <Text style={styles.societyName}>{soc.name}</Text>
                                <View style={[
                                    styles.roleBadge,
                                    { backgroundColor: soc.role === 'admin' ? Colors.badge.admin : Colors.badge.member }
                                ]}>
                                    <Text style={styles.roleBadgeText}>
                                        {soc.role === 'admin' ? 'Admin' : 'Member'}
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.societyFlat}>{soc.flatNumber}</Text>
                            <View style={styles.societyCardBottom}>
                                <View style={styles.memberInfo}>
                                    <Ionicons name="people-outline" size={13} color="rgba(255,255,255,0.8)" />
                                    <Text style={styles.memberCount}>{soc.memberCount} Members</Text>
                                </View>
                                <View style={styles.statuspill}>
                                    <View style={[styles.statusDot,
                                    { backgroundColor: soc.status === 'clean' ? '#4ADE80' : '#F87171' }
                                    ]} />
                                    <Text style={styles.statusText}>{soc.statusLabel}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* FABs */}
            <View style={styles.fabRow}>
                <TouchableOpacity
                    style={styles.fabSecondary}
                    onPress={() => router.push('/join-society')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="qr-code-outline" size={18} color={Colors.primary} />
                    <Text style={styles.fabSecondaryText}>Join via QR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.fabPrimary}
                    onPress={() => router.push('/create-society')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="add" size={18} color="#FFF" />
                    <Text style={styles.fabPrimaryText}>Create Society</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.background },
    container: { flex: 1, paddingHorizontal: 20 },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 16,
        paddingBottom: 20,
    },
    greeting: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text,
    },
    greetingSub: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    notifBtn: {
        padding: 8,
        position: 'relative',
        backgroundColor: Colors.surface,
        borderRadius: Radius.full,
        ...Shadow.sm,
    },
    notifDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.danger,
        borderWidth: 1.5,
        borderColor: '#FFF',
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.textMuted,
        letterSpacing: 1,
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 10,
    },
    viewAll: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: '600',
    },
    alertsContainer: { gap: 10, marginBottom: 8 },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: 14,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    alertIcon: {
        width: 38,
        height: 38,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertBody: { flex: 1 },
    alertTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 2,
    },
    alertDesc: {
        fontSize: 11,
        color: Colors.textSecondary,
        lineHeight: 16,
    },
    alertAction: {
        backgroundColor: Colors.primarySurface,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: Radius.full,
    },
    alertActionText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.primary,
    },
    societyCard: {
        borderRadius: Radius.xl,
        overflow: 'hidden',
        height: 150,
        marginBottom: 14,
        ...Shadow.md,
    },
    societyCardImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: 150,
    },
    societyCardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(15, 40, 25, 0.65)',
    },
    societyCardContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    societyCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    societyName: {
        fontSize: 17,
        fontWeight: '800',
        color: '#FFFFFF',
        flex: 1,
    },
    roleBadge: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: Radius.full,
    },
    roleBadgeText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '700',
    },
    societyFlat: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.75)',
    },
    societyCardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    memberInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    memberCount: { fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
    statuspill: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    statusDot: { width: 7, height: 7, borderRadius: 4 },
    statusText: { fontSize: 12, color: '#FFF', fontWeight: '600' },
    fabRow: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 100 : 80,
        left: 20,
        right: 20,
        flexDirection: 'row',
        gap: 12,
    },
    fabPrimary: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: Radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        ...Shadow.lg,
    },
    fabPrimaryText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
    fabSecondary: {
        flex: 1,
        backgroundColor: Colors.surface,
        paddingVertical: 14,
        borderRadius: Radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        borderWidth: 1.5,
        borderColor: Colors.primaryBorder,
        ...Shadow.sm,
    },
    fabSecondaryText: { color: Colors.primary, fontSize: 14, fontWeight: '700' },
});
