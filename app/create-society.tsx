import {
    View, Text, StyleSheet, TouchableOpacity, TextInput,
    ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Shadow } from '../constants/Colors';

export default function CreateSocietyScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [flatNumber, setFlatNumber] = useState('');
    const [created, setCreated] = useState(false);

    const mockSlug = 'jX9k2';

    const handleCreate = () => {
        if (!name.trim()) {
            Alert.alert('Required', 'Please enter a society name.');
            return;
        }
        setCreated(true);
    };

    if (created) {
        return (
            <SafeAreaView style={[styles.safe, { backgroundColor: Colors.primary }]}>
                <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                        <Ionicons name="checkmark-circle" size={64} color={Colors.primary} />
                    </View>
                    <Text style={styles.successTitle}>Society Created!</Text>
                    <Text style={styles.successSubtitle}>Your QR code is ready to share</Text>

                    {/* QR Placeholder */}
                    <View style={styles.qrPlaceholder}>
                        <View style={styles.qrBox}>
                            <Ionicons name="qr-code" size={80} color={Colors.primary} />
                        </View>
                        <Text style={styles.slugText}>cleanindia.app/{mockSlug}</Text>
                        <Text style={styles.slugSub}>Print & stick at your society entrance</Text>
                    </View>

                    <View style={styles.successActions}>
                        <TouchableOpacity style={styles.shareBtn}>
                            <Ionicons name="share-social-outline" size={18} color={Colors.primary} />
                            <Text style={styles.shareBtnText}>Share QR Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.doneBtn}
                            onPress={() => router.replace('/(tabs)')}
                        >
                            <Ionicons name="home-outline" size={16} color="#FFF" style={{ marginRight: 8 }} />
                            <Text style={styles.doneBtnText}>Go to Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Society</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>
                    Set up your neighborhood society. A permanent QR code will be generated that you can print and share.
                </Text>

                {/* Info box */}
                <View style={styles.infoBox}>
                    <Ionicons name="information-circle" size={18} color={Colors.primary} />
                    <Text style={styles.infoText}>
                        Duplicate society names are allowed. Only your unique slug URL will be permanent.
                    </Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Society / Galli Name *</Text>
                        <TextInput
                            style={styles.fieldInput}
                            placeholder="e.g., Green Park Society, Sector 4"
                            placeholderTextColor={Colors.textMuted}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Area / Location</Text>
                        <TextInput
                            style={styles.fieldInput}
                            placeholder="e.g., Koramangala, Bengaluru"
                            placeholderTextColor={Colors.textMuted}
                            value={location}
                            onChangeText={setLocation}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Your Flat / House Number</Text>
                        <TextInput
                            style={styles.fieldInput}
                            placeholder="e.g., B-304, House 12"
                            placeholderTextColor={Colors.textMuted}
                            value={flatNumber}
                            onChangeText={setFlatNumber}
                        />
                    </View>
                </View>

                {/* Creator becomes admin */}
                <View style={styles.adminNote}>
                    <Ionicons name="star" size={16} color={Colors.accent} />
                    <Text style={styles.adminNoteText}>
                        You will automatically become Admin #1 of this society.
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.createBtn} onPress={handleCreate} activeOpacity={0.87}>
                    <Ionicons name="qr-code-outline" size={18} color="#FFF" />
                    <Text style={styles.createBtnText}>Create & Generate QR</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    closeBtn: {
        padding: 4,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: Colors.surfaceAlt,
    },
    headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.text },
    container: { flex: 1, padding: 24 },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 21,
        marginBottom: 16,
    },
    infoBox: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.md,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        marginBottom: 24,
    },
    infoText: { flex: 1, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
    form: { gap: 16 },
    field: { gap: 6 },
    fieldLabel: { fontSize: 13, fontWeight: '700', color: Colors.text },
    fieldInput: {
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        paddingVertical: 12,
        paddingHorizontal: 14,
        fontSize: 14,
        color: Colors.text,
        backgroundColor: Colors.background,
    },
    adminNote: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 20,
        padding: 12,
        backgroundColor: Colors.accentLight,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: '#F0A50030',
    },
    adminNoteText: { flex: 1, fontSize: 12, color: Colors.text, lineHeight: 18 },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    createBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: Radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...Shadow.md,
    },
    createBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
    // Success screen
    successContainer: {
        flex: 1,
        backgroundColor: Colors.surface,
        alignItems: 'center',
        padding: 32,
        justifyContent: 'center',
    },
    successIcon: { marginBottom: 16 },
    successTitle: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 6 },
    successSubtitle: { fontSize: 14, color: Colors.textSecondary, marginBottom: 32 },
    qrPlaceholder: {
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: Radius.xl,
        padding: 28,
        width: '100%',
        borderWidth: 2,
        borderColor: Colors.primaryBorder,
        marginBottom: 32,
    },
    qrBox: {
        width: 120,
        height: 120,
        borderWidth: 2,
        borderColor: Colors.primaryBorder,
        borderRadius: Radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surface,
        marginBottom: 12,
    },
    slugText: { fontSize: 15, fontWeight: '700', color: Colors.primary, marginBottom: 4 },
    slugSub: { fontSize: 12, color: Colors.textMuted },
    successActions: { width: '100%', gap: 12 },
    shareBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: Radius.full,
        borderWidth: 1.5,
        borderColor: Colors.primaryBorder,
    },
    shareBtnText: { fontSize: 15, fontWeight: '700', color: Colors.primary },
    doneBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: Radius.full,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        ...Shadow.md,
    },
    doneBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
