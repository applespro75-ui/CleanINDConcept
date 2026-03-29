import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Shadow } from '../constants/Colors';

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        type: 'alert',
        title: 'Clean-up Drive Tomorrow',
        body: 'Don\'t forget about the neighborhood run starting at 9 AM near the main gate.',
        time: '2h ago',
        read: false,
    },
    {
        id: '2',
        type: 'info',
        title: 'New Member Joined',
        body: 'A new resident has joined your society.',
        time: '5h ago',
        read: true,
    },
    {
        id: '3',
        type: 'success',
        title: 'Target Reached!',
        body: 'The cleanup pool for sector 4 has reached its goal.',
        time: '1d ago',
        read: true,
    },
];

export default function NotificationsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={22} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {MOCK_NOTIFICATIONS.length > 0 ? (
                    MOCK_NOTIFICATIONS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.notifCard, !item.read && styles.notifCardUnread]}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconBox, { backgroundColor: item.type === 'alert' ? '#FEF2F2' : item.type === 'success' ? '#F0FDF4' : Colors.primarySurface }]}>
                                <Ionicons
                                    name={item.type === 'alert' ? 'alert-circle' : item.type === 'success' ? 'checkmark-circle' : 'information-circle'}
                                    size={24}
                                    color={item.type === 'alert' ? '#DC2626' : item.type === 'success' ? '#16A34A' : Colors.primary}
                                />
                            </View>
                            <View style={styles.notifBody}>
                                <View style={styles.notifTopRow}>
                                    <Text style={[styles.notifTitle, !item.read && styles.notifTitleUnread]}>{item.title}</Text>
                                    <Text style={styles.notifTime}>{item.time}</Text>
                                </View>
                                <Text style={styles.notifText}>{item.body}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={48} color={Colors.textMuted} />
                        <Text style={styles.emptyTitle}>No Notifications</Text>
                        <Text style={styles.emptyText}>You're all caught up!</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.surfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.text },
    scrollContent: { padding: 16 },
    notifCard: {
        flexDirection: 'row',
        gap: 14,
        padding: 16,
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    notifCardUnread: {
        backgroundColor: '#F5F3FF',
        borderColor: '#DDD6FE',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifBody: { flex: 1 },
    notifTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    notifTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
        flex: 1,
    },
    notifTitleUnread: { fontWeight: '800' },
    notifTime: { fontSize: 12, color: Colors.textMuted, marginLeft: 8 },
    notifText: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginTop: 16, marginBottom: 8 },
    emptyText: { fontSize: 14, color: Colors.textSecondary },
});
