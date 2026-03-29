import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Image, TextInput, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../../constants/Colors';
import { MOCK_SOCIETIES, MOCK_POSTS, MOCK_USER } from '../../constants/MockData';

const FILTERS = ['All Posts', 'Issues', 'Announcements', 'Clean-Ups'];

export default function SocietyScreen() {
    const [activeSociety, setActiveSociety] = useState(MOCK_SOCIETIES[0]);
    const [activeFilter, setActiveFilter] = useState('All Posts');
    const [showDropdown, setShowDropdown] = useState(false);
    const [messageText, setMessageText] = useState('');

    const filteredPosts = MOCK_POSTS.filter((p) => {
        if (activeFilter === 'All Posts') return true;
        if (activeFilter === 'Issues') return p.type === 'issue';
        if (activeFilter === 'Announcements') return p.type === 'announcement';
        if (activeFilter === 'Clean-Ups') return p.type === 'before_after';
        return true;
    });
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.safe, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.societySelector}
                    onPress={() => setShowDropdown(!showDropdown)}
                    activeOpacity={0.8}
                >
                    <View style={styles.selectorDot} />
                    <Text style={styles.societyName}>{activeSociety.name}</Text>
                    <Ionicons name="chevron-down" size={16} color={Colors.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.notifBtn}>
                    <Ionicons name="notifications-outline" size={22} color={Colors.text} />
                    <View style={styles.notifDot} />
                </TouchableOpacity>
            </View>

            {/* Society Dropdown */}
            {showDropdown && (
                <View style={styles.dropdown}>
                    {MOCK_SOCIETIES.map((soc) => (
                        <TouchableOpacity
                            key={soc.id}
                            style={styles.dropdownItem}
                            onPress={() => { setActiveSociety(soc); setShowDropdown(false); }}
                        >
                            <View style={[styles.dropdownDot, { backgroundColor: soc.id === activeSociety.id ? Colors.primary : Colors.textMuted }]} />
                            <Text style={[styles.dropdownText, soc.id === activeSociety.id && { color: Colors.primary, fontWeight: '700' }]}>
                                {soc.name}
                            </Text>
                            {soc.id === activeSociety.id && <Ionicons name="checkmark" size={16} color={Colors.primary} />}
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Admin Cleanup Banner */}
            {activeSociety.role === 'admin' && (
                <TouchableOpacity style={styles.cleanupBanner} activeOpacity={0.9}>
                    <Ionicons name="rocket" size={18} color="#FFF" />
                    <Text style={styles.cleanupBannerText}>Initiate Clean-Up Drive</Text>
                    <Ionicons name="chevron-forward" size={16} color="#FFF" />
                </TouchableOpacity>
            )}

            {/* Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersBar}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 8, alignItems: 'center' }}
            >
                {FILTERS.map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
                        onPress={() => setActiveFilter(f)}
                    >
                        <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Feed */}
            <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Message limit bar */}
            <View style={styles.msgLimitBar}>
                <View style={styles.msgCounter}>
                    <Ionicons name="chatbubble-outline" size={14} color={Colors.textMuted} />
                    <Text style={styles.msgCounterText}>{MOCK_USER.messagesUsed}/{MOCK_USER.messagesLimit} today</Text>
                </View>
                <View style={styles.chatInputRow}>
                    <TouchableOpacity style={styles.attachBtn}>
                        <Ionicons name="add" size={24} color={Colors.textMuted} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.chatInput}
                        placeholder="Report an issue or discuss..."
                        placeholderTextColor={Colors.textMuted}
                        value={messageText}
                        onChangeText={setMessageText}
                        multiline={false}
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, messageText.length > 0 && styles.sendBtnActive]}
                    >
                        <Ionicons
                            name="send"
                            size={16}
                            color={messageText.length > 0 ? '#FFF' : Colors.textMuted}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function PostCard({ post }: { post: any }) {
    return (
        <View style={styles.postCard}>
            <View style={styles.postHeader}>
                <View style={styles.authorAvatar}>
                    <Text style={styles.authorInitial}>{post.author[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.authorRow}>
                        <Text style={styles.authorName}>{post.author}</Text>
                        {post.priority === 'HIGH' && (
                            <View style={styles.priorityBadge}>
                                <Text style={styles.priorityText}>HIGH PRIORITY</Text>
                            </View>
                        )}
                        {post.status === 'RESOLVED' && (
                            <View style={styles.resolvedBadge}>
                                <Text style={styles.resolvedText}>RESOLVED</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.postMeta}>{post.flat} · {post.timeAgo}</Text>
                </View>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {/* Single image */}
            {post.image && (
                <Image source={{ uri: post.image }} style={styles.postImage} />
            )}

            {/* Before/After */}
            {post.beforeImage && post.afterImage && (
                <View style={styles.beforeAfterRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.bafLabel}>Before</Text>
                        <Image source={{ uri: post.beforeImage }} style={styles.bafImage} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.bafLabel}>After</Text>
                        <Image source={{ uri: post.afterImage }} style={styles.bafImage} />
                    </View>
                </View>
            )}

            {/* Reactions */}
            <View style={styles.postActions}>
                <TouchableOpacity style={styles.reactBtn}>
                    <Ionicons name="heart-outline" size={16} color={Colors.textMuted} />
                    <Text style={styles.reactCount}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactBtn}>
                    <Ionicons name="chatbubble-outline" size={16} color={Colors.textMuted} />
                    <Text style={styles.reactCount}>{post.comments}</Text>
                </TouchableOpacity>
                {post.type === 'issue' && (
                    <TouchableOpacity style={styles.viewStatusBtn}>
                        <Text style={styles.viewStatusText}>View Status</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    societySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    selectorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    societyName: {
        fontSize: 16,
        fontWeight: '800',
        color: Colors.text,
    },
    notifBtn: {
        padding: 6,
        backgroundColor: Colors.background,
        borderRadius: Radius.full,
        position: 'relative',
    },
    notifDot: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: Colors.danger,
    },
    dropdown: {
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        paddingVertical: 8,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    dropdownDot: { width: 8, height: 8, borderRadius: 4 },
    dropdownText: { flex: 1, fontSize: 14, color: Colors.text },
    cleanupBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: Colors.primary,
        paddingVertical: 13,
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: Radius.lg,
        ...Shadow.md,
    },
    cleanupBannerText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
    filtersBar: { maxHeight: 60, marginTop: 4, marginBottom: 12 },
    filterChip: {
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: Radius.full,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    filterChipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filterText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
    filterTextActive: { color: '#FFF', fontWeight: '700' },
    feed: { flex: 1, paddingHorizontal: 16, paddingTop: 12 },
    postCard: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    postHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
    authorAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Colors.primarySurface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.primaryBorder,
    },
    authorInitial: { fontSize: 15, fontWeight: '800', color: Colors.primary },
    authorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
    authorName: { fontSize: 14, fontWeight: '700', color: Colors.text },
    postMeta: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
    priorityBadge: {
        backgroundColor: Colors.dangerLight,
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: Radius.full,
        borderWidth: 1,
        borderColor: Colors.danger,
    },
    priorityText: { fontSize: 9, fontWeight: '800', color: Colors.danger, letterSpacing: 0.5 },
    resolvedBadge: {
        backgroundColor: Colors.primarySurface,
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: Radius.full,
    },
    resolvedText: { fontSize: 9, fontWeight: '800', color: Colors.primary, letterSpacing: 0.5 },
    postContent: {
        fontSize: 13,
        color: Colors.text,
        lineHeight: 20,
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 160,
        borderRadius: Radius.md,
        marginBottom: 10,
    },
    beforeAfterRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
    bafLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, marginBottom: 4 },
    bafImage: { width: '100%', height: 100, borderRadius: Radius.md },
    postActions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    reactBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    reactCount: { fontSize: 13, color: Colors.textMuted },
    viewStatusBtn: {
        marginLeft: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: Radius.full,
        backgroundColor: Colors.primarySurface,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    viewStatusText: { fontSize: 11, fontWeight: '700', color: Colors.primary },
    msgLimitBar: {
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    },
    msgCounter: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8 },
    msgCounterText: { fontSize: 11, color: Colors.textMuted },
    chatInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    attachBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    chatInput: {
        flex: 1,
        backgroundColor: Colors.background,
        borderRadius: Radius.full,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: Colors.text,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    sendBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendBtnActive: { backgroundColor: Colors.primary },
});
