import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    TextInput, Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../../constants/Colors';
import { MOCK_WORKERS, MOCK_USER } from '../../constants/MockData';

const AVAILABILITY_FILTERS = ['Available Now', 'Morning Shift', 'Flexible', 'Weekends'];

export default function MarketScreen() {
    const [searchText, setSearchText] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>('Available Now');
    const [isWorker, setIsWorker] = useState(MOCK_USER.isWorker);

    const filteredWorkers = MOCK_WORKERS.filter((w) => {
        const matchSearch =
            searchText === '' ||
            w.name.toLowerCase().includes(searchText.toLowerCase()) ||
            w.area.toLowerCase().includes(searchText.toLowerCase()) ||
            w.specialty.toLowerCase().includes(searchText.toLowerCase());

        const matchFilter =
            activeFilter === null ||
            (activeFilter === 'Available Now' && w.available) ||
            (activeFilter === 'Flexible' && w.schedule.toLowerCase().includes('flex')) ||
            (activeFilter === 'Weekends' && w.schedule.toLowerCase().includes('weekend')) ||
            (activeFilter === 'Morning Shift' && w.schedule.toLowerCase().includes('am'));

        return matchSearch && matchFilter;
    });
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.safe, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Worker Marketplace</Text>
                    <Text style={styles.headerSub}>Find cleaners and volunteers in your area</Text>
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="refresh-outline" size={20} color={Colors.text} />
                </TouchableOpacity>
            </View>

            {/* I want to work toggle */}
            <View style={styles.workerToggleCard}>
                <View style={styles.workerToggleLeft}>
                    <View style={styles.workerToggleIcon}>
                        <Ionicons name="construct-outline" size={20} color={Colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.workerToggleTitle}>I want to work</Text>
                        <Text style={styles.workerToggleSub}>
                            {isWorker ? 'You are listed as a worker' : 'Switch to see available tasks near you'}
                        </Text>
                    </View>
                </View>
                <Switch
                    value={isWorker}
                    onValueChange={setIsWorker}
                    trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                    thumbColor={isWorker ? Colors.primary : '#FFF'}
                />
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={18} color={Colors.textMuted} style={{ marginLeft: 12 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by area (e.g., Koramangala)"
                    placeholderTextColor={Colors.textMuted}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')} style={{ padding: 8 }}>
                        <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
                    </TouchableOpacity>
                )}
            </View>

            {/* Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersBar}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
            >
                {AVAILABILITY_FILTERS.map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
                        onPress={() => setActiveFilter(activeFilter === f ? null : f)}
                    >
                        <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Results count */}
            <View style={styles.resultsRow}>
                <Text style={styles.resultsText}>
                    Showing <Text style={{ fontWeight: '700', color: Colors.primary }}>{filteredWorkers.length}</Text> nearby
                </Text>
            </View>

            {/* Worker List */}
            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
                {filteredWorkers.map((worker) => (
                    <WorkerCard key={worker.id} worker={worker} />
                ))}
                {filteredWorkers.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="search-outline" size={48} color={Colors.textMuted} />
                        <Text style={styles.emptyTitle}>No workers found</Text>
                        <Text style={styles.emptySubtitle}>Try adjusting filters or search term</Text>
                    </View>
                )}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

function WorkerCard({ worker }: { worker: any }) {
    return (
        <View style={styles.workerCard}>
            <View style={[styles.workerAvatar, { backgroundColor: worker.color + '22' }]}>
                <Text style={[styles.workerInitials, { color: worker.color }]}>{worker.initials}</Text>
            </View>
            <View style={styles.workerInfo}>
                <View style={styles.workerNameRow}>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    {worker.available && (
                        <View style={styles.availableDot}>
                            <View style={styles.availableDotInner} />
                        </View>
                    )}
                </View>
                <Text style={styles.workerSpecialty}>{worker.specialty}</Text>
                <View style={styles.workerMeta}>
                    <View style={styles.workerMetaItem}>
                        <Ionicons name="location-outline" size={12} color={Colors.textMuted} />
                        <Text style={styles.workerMetaText}>{worker.area}</Text>
                    </View>
                    <View style={styles.workerMetaItem}>
                        <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
                        <Text style={styles.workerMetaText}>{worker.schedule}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.workerActions}>
                <TouchableOpacity style={styles.callBtn}>
                    <Ionicons name="call-outline" size={18} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.background },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 14,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.text },
    headerSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
    filterBtn: {
        padding: 8,
        backgroundColor: Colors.background,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    workerToggleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 14,
        padding: 14,
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        ...Shadow.sm,
    },
    workerToggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    workerToggleIcon: {
        width: 40,
        height: 40,
        borderRadius: Radius.md,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    workerToggleTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
    workerToggleSub: { fontSize: 11, color: Colors.textSecondary, marginTop: 1 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 12,
        backgroundColor: Colors.surface,
        borderRadius: Radius.full,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 11,
        paddingHorizontal: 10,
        fontSize: 14,
        color: Colors.text,
    },
    filtersBar: { maxHeight: 54, paddingTop: 10 },
    filterChip: {
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: Radius.full,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        height: 34,
    },
    filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    filterText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '500' },
    filterTextActive: { color: '#FFF', fontWeight: '700' },
    resultsRow: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 4,
    },
    resultsText: { fontSize: 12, color: Colors.textSecondary },
    list: { flex: 1, paddingHorizontal: 16 },
    workerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    workerAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    workerInitials: { fontSize: 18, fontWeight: '800' },
    workerInfo: { flex: 1 },
    workerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    workerName: { fontSize: 14, fontWeight: '700', color: Colors.text },
    availableDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#DCFCE7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    availableDotInner: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#22C55E',
    },
    workerSpecialty: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
        marginBottom: 6,
        fontStyle: 'italic',
    },
    workerMeta: { gap: 3 },
    workerMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    workerMetaText: { fontSize: 11, color: Colors.textMuted },
    workerActions: { alignItems: 'center', gap: 8 },
    callBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    emptyState: {
        alignItems: 'center',
        paddingTop: 60,
        gap: 12,
    },
    emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
    emptySubtitle: { fontSize: 13, color: Colors.textMuted },
});
