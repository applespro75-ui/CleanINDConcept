import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../../constants/Colors';
import { MOCK_USER, MOCK_SOCIETIES } from '../../constants/MockData';

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/') },
            ]
        );
    };
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.safe, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Avatar & Identity */}
                <View style={styles.identityCard}>
                    <View style={styles.avatarWrap}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarInitial}>{MOCK_USER.name[0]}</Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Ionicons name="shield-checkmark" size={14} color="#FFF" />
                        </View>
                    </View>
                    <View style={styles.identityInfo}>
                        <Text style={styles.userName}>{MOCK_USER.name}</Text>
                        <View style={styles.deviceIdRow}>
                            <Text style={styles.deviceId}>ID: {MOCK_USER.deviceId}</Text>
                        </View>
                        <View style={styles.secureIdentityBadge}>
                            <Ionicons name="shield-checkmark-outline" size={12} color={Colors.primary} />
                            <Text style={styles.secureIdentityText}>Secure Device Identity</Text>
                        </View>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{MOCK_USER.messagesUsed}/{MOCK_USER.messagesLimit}</Text>
                        <Text style={styles.statLabel}>MESSAGES</Text>
                        <View style={styles.statBar}>
                            <View
                                style={[styles.statBarFill, { width: `${(MOCK_USER.messagesUsed / MOCK_USER.messagesLimit) * 100}%` }]}
                            />
                        </View>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{MOCK_USER.workerStatus}</Text>
                        <Text style={styles.statLabel}>WORKER STATUS</Text>
                        <View style={[
                            styles.workerStatusPill,
                            { backgroundColor: MOCK_USER.workerStatus === 'Active' ? Colors.primarySurface : Colors.surfaceAlt }
                        ]}>
                            <View style={[
                                styles.workerStatusDot,
                                { backgroundColor: MOCK_USER.workerStatus === 'Active' ? Colors.primary : Colors.textMuted }
                            ]} />
                            <Text style={[
                                styles.workerStatusText,
                                { color: MOCK_USER.workerStatus === 'Active' ? Colors.primary : Colors.textMuted }
                            ]}>
                                {MOCK_USER.workerStatus}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* My Societies */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My Societies</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {MOCK_SOCIETIES.map((soc) => (
                        <View key={soc.id} style={styles.societyRow}>
                            <Image source={{ uri: soc.image }} style={styles.societyThumb} />
                            <View style={styles.societyInfo}>
                                <Text style={styles.societyName}>{soc.name}</Text>
                                <Text style={styles.societyLocation}>{soc.location}</Text>
                                <View style={[
                                    styles.roleChip,
                                    {
                                        backgroundColor: soc.role === 'admin' ? Colors.badge.admin : Colors.primarySurface
                                    }
                                ]}>
                                    <Text style={[
                                        styles.roleChipText,
                                        { color: '#FFF' }
                                    ]}>
                                        {soc.role === 'admin' ? 'RESIDENT' : 'GUEST'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.societyBtns}>
                                <TouchableOpacity style={styles.leaveBtn}>
                                    <Text style={styles.leaveBtnText}>Leave</Text>
                                </TouchableOpacity>
                                {soc.role === 'admin' && (
                                    <TouchableOpacity style={styles.transferBtn}>
                                        <Ionicons name="swap-horizontal" size={12} color={Colors.primary} style={{ marginRight: 4 }} />
                                        <Text style={styles.transferBtnText}>Transfer</Text>
                                    </TouchableOpacity>
                                )}
                                {soc.role !== 'admin' && (
                                    <TouchableOpacity style={styles.leaveBtn}>
                                        <Text style={styles.leaveBtnText}>Leave Society</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}

                    {/* Join or Create */}
                    <TouchableOpacity
                        style={styles.joinCreateBtn}
                        onPress={() => router.push('/join-or-start')}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add-circle-outline" size={18} color={Colors.primary} />
                        <Text style={styles.joinCreateText}>Join or Create New Society</Text>
                    </TouchableOpacity>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    {[
                        { icon: 'document-text-outline', label: 'Community Guidelines', color: Colors.primary, route: '/community-guidelines' },
                        { icon: 'lock-closed-outline', label: 'Privacy & Data', color: Colors.textSecondary, route: '/privacy-policy' },
                    ].map((item) => (
                        <TouchableOpacity key={item.label} style={styles.menuRow} activeOpacity={0.7} onPress={() => router.push(item.route as any)}>
                            <View style={[styles.menuIcon, { backgroundColor: Colors.primarySurface }]}>
                                <Ionicons name={item.icon as any} size={18} color={item.color} />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                        </TouchableOpacity>
                    ))}

                    {/* Logout */}
                    <TouchableOpacity style={styles.menuRow} onPress={handleLogout} activeOpacity={0.7}>
                        <View style={[styles.menuIcon, { backgroundColor: Colors.dangerLight }]}>
                            <Ionicons name="log-out-outline" size={18} color={Colors.danger} />
                        </View>
                        <Text style={[styles.menuLabel, { color: Colors.danger }]}>Log Out</Text>
                        <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                    </TouchableOpacity>
                </View>

                {/* Version */}
                <Text style={styles.version}>Version 1.0.0 (Build 1)</Text>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.background },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.text },
    editBtn: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.full,
    },
    editText: { fontSize: 13, fontWeight: '700', color: Colors.primary },

    identityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 20,
        backgroundColor: Colors.surface,
    },
    avatarWrap: { position: 'relative' },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Colors.primaryBorder,
    },
    avatarInitial: { fontSize: 28, fontWeight: '800', color: Colors.primary },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    identityInfo: { flex: 1, gap: 4 },
    userName: { fontSize: 18, fontWeight: '800', color: Colors.text },
    deviceIdRow: { flexDirection: 'row', alignItems: 'center' },
    deviceId: { fontSize: 12, color: Colors.textMuted, fontFamily: 'monospace' },
    secureIdentityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        alignSelf: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.full,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    secureIdentityText: { fontSize: 10, fontWeight: '700', color: Colors.primary },

    statsRow: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        marginTop: 1,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
    },
    statCard: { flex: 1, alignItems: 'center', gap: 4 },
    statDivider: { width: 1, backgroundColor: Colors.divider, marginVertical: 4 },
    statValue: { fontSize: 20, fontWeight: '800', color: Colors.text },
    statLabel: { fontSize: 9, fontWeight: '700', color: Colors.textMuted, letterSpacing: 1 },
    statBar: {
        height: 4,
        width: 60,
        backgroundColor: Colors.border,
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 2,
    },
    statBarFill: { height: 4, backgroundColor: Colors.warning, borderRadius: 2 },
    workerStatusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: Radius.full,
        marginTop: 2,
    },
    workerStatusDot: { width: 6, height: 6, borderRadius: 3 },
    workerStatusText: { fontSize: 11, fontWeight: '600' },

    section: {
        backgroundColor: Colors.surface,
        marginTop: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.divider,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
    },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
    sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.text },
    viewAll: { fontSize: 13, color: Colors.primary, fontWeight: '600' },

    societyRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
    },
    societyThumb: {
        width: 72,
        height: 72,
        borderRadius: Radius.md,
    },
    societyInfo: { flex: 1, gap: 4 },
    societyName: { fontSize: 14, fontWeight: '700', color: Colors.text },
    societyLocation: { fontSize: 11, color: Colors.textSecondary },
    roleChip: {
        alignSelf: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: Radius.full,
    },
    roleChipText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
    societyBtns: { alignItems: 'flex-end', gap: 6 },
    leaveBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: Radius.full,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    leaveBtnText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
    transferBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: Radius.full,
        backgroundColor: Colors.primarySurface,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        flexDirection: 'row',
        alignItems: 'center',
    },
    transferBtnText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },

    joinCreateBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        marginTop: 12,
        borderRadius: Radius.lg,
        borderWidth: 1.5,
        borderColor: Colors.primaryBorder,
        borderStyle: 'dashed',
    },
    joinCreateText: { fontSize: 14, fontWeight: '600', color: Colors.primary },

    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
    },
    menuIcon: {
        width: 36,
        height: 36,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: Colors.text },
    version: {
        textAlign: 'center',
        fontSize: 11,
        color: Colors.textMuted,
        paddingVertical: 20,
    },
});
