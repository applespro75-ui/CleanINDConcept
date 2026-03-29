import {
    View, Text, StyleSheet, TouchableOpacity, TextInput,
    StatusBar, Alert, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Colors, Radius, Shadow } from '../constants/Colors';

export default function JoinSocietyScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [permission, requestPermission] = useCameraPermissions();
    const [code, setCode] = useState('');
    const [mode, setMode] = useState<'qr' | 'code'>('qr');

    const handleJoin = () => {
        if (!code.trim()) {
            Alert.alert('Enter Code', 'Please enter a society code to join.');
            return;
        }
        Alert.alert(
            'Joined!',
            `Successfully joined society with code: ${code}`,
            [{ text: 'Go to Home', onPress: () => router.replace('/(tabs)') }]
        );
    };

    const handleBarcodeScanned = ({ data }: { data: string }) => {
        if (data) {
            setCode(data);
            setMode('code');
        }
    };

    return (
        <View style={[styles.safe, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header — properly below status bar / notch */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
                    <Ionicons name="close" size={22} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Join Society</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.description}>
                    Join an existing society by scanning the QR code at your gate, or enter the society code manually.
                </Text>

                {/* Mode Toggle */}
                <View style={styles.modeToggle}>
                    <TouchableOpacity
                        style={[styles.modeBtn, mode === 'qr' && styles.modeBtnActive]}
                        onPress={() => setMode('qr')}
                    >
                        <Ionicons name="qr-code" size={16} color={mode === 'qr' ? '#FFF' : Colors.textSecondary} />
                        <Text style={[styles.modeBtnText, mode === 'qr' && styles.modeBtnTextActive]}>Scan QR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.modeBtn, mode === 'code' && styles.modeBtnActive]}
                        onPress={() => setMode('code')}
                    >
                        <Ionicons name="keypad" size={16} color={mode === 'code' ? '#FFF' : Colors.textSecondary} />
                        <Text style={[styles.modeBtnText, mode === 'code' && styles.modeBtnTextActive]}>Enter Code</Text>
                    </TouchableOpacity>
                </View>

                {mode === 'qr' ? (
                    /* ── QR Scanner ── */
                    <View style={styles.qrSection}>
                        <View style={styles.qrScannerBox}>
                            {(!permission || !permission.granted) ? (
                                <>
                                    <Ionicons name="camera-outline" size={50} color="rgba(255,255,255,0.3)" />
                                    <Text style={styles.qrIdleText}>Camera access needed</Text>
                                </>
                            ) : (
                                <CameraView
                                    style={StyleSheet.absoluteFillObject}
                                    facing="back"
                                    onBarcodeScanned={handleBarcodeScanned}
                                    barcodeScannerSettings={{
                                        barcodeTypes: ["qr"],
                                    }}
                                />
                            )}

                            {/* Corner brackets */}
                            <View style={[styles.corner, styles.cornerTL]} />
                            <View style={[styles.corner, styles.cornerTR]} />
                            <View style={[styles.corner, styles.cornerBL]} />
                            <View style={[styles.corner, styles.cornerBR]} />
                        </View>

                        <Text style={styles.qrHint}>
                            Point your camera at the QR code at your society entrance
                        </Text>

                        {(!permission || !permission.granted) && (
                            <TouchableOpacity
                                style={styles.scanBtn}
                                onPress={requestPermission}
                                activeOpacity={0.87}
                            >
                                <Ionicons name="camera" size={20} color="#FFF" />
                                <Text style={styles.scanBtnText}>Grant Camera Permission</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={styles.switchToCodeBtn}
                            onPress={() => setMode('code')}
                        >
                            <Ionicons name="keypad-outline" size={14} color={Colors.primary} />
                            <Text style={styles.switchToCodeText}>Enter code manually instead</Text>
                        </TouchableOpacity>
                    </View>

                ) : (
                    /* ── Code Entry ── */
                    <View style={styles.codeSection}>
                        <View style={styles.field}>
                            <Text style={styles.fieldLabel}>Society Code or Slug</Text>
                            <TextInput
                                style={styles.fieldInput}
                                placeholder="e.g., jX9k2"
                                placeholderTextColor={Colors.textMuted}
                                value={code}
                                onChangeText={setCode}
                                autoCapitalize="none"
                                autoFocus
                            />
                            <Text style={styles.fieldHint}>
                                Find the code on your society's QR print or ask your admin.
                            </Text>
                        </View>

                        {/* Instant join badge */}
                        <View style={styles.instantBadge}>
                            <Ionicons name="flash" size={14} color={Colors.primary} />
                            <Text style={styles.instantBadgeText}>Instant join no approval needed</Text>
                        </View>

                        {/* Join button — full width, prominent */}
                        <TouchableOpacity
                            style={[styles.joinBtn, !code.trim() && styles.joinBtnDisabled]}
                            onPress={handleJoin}
                            activeOpacity={0.87}
                            disabled={!code.trim()}
                        >
                            <Ionicons
                                name="enter-outline"
                                size={20}
                                color={code.trim() ? '#FFF' : Colors.textMuted}
                            />
                            <Text style={[styles.joinBtnText, !code.trim() && styles.joinBtnTextDisabled]}>
                                Join Society
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.scanInsteadBtn} onPress={() => setMode('qr')}>
                            <Ionicons name="qr-code-outline" size={14} color={Colors.primary} />
                            <Text style={styles.scanInsteadText}>Scan QR code instead</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        backgroundColor: '#FFFFFF',
    },
    closeBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: Colors.surfaceAlt,
    },
    headerTitle: { fontSize: 17, fontWeight: '800', color: Colors.text },
    container: { flex: 1 },
    scrollContent: {
        padding: 24,
        paddingBottom: 48,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 21,
        marginBottom: 24,
    },
    modeToggle: {
        flexDirection: 'row',
        backgroundColor: Colors.background,
        borderRadius: Radius.lg,
        padding: 4,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    modeBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
        borderRadius: Radius.md,
    },
    modeBtnActive: { backgroundColor: Colors.primary },
    modeBtnText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },
    modeBtnTextActive: { color: '#FFF' },

    /* QR Section */
    qrSection: { alignItems: 'center', gap: 22 },
    qrScannerBox: {
        width: 240,
        height: 240,
        backgroundColor: '#1C1C1E',
        borderRadius: Radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        gap: 10,
    },
    corner: {
        position: 'absolute',
        width: 28,
        height: 28,
        borderColor: Colors.primary,
        borderWidth: 3,
    },
    cornerTL: { top: 16, left: 16, borderRightWidth: 0, borderBottomWidth: 0 },
    cornerTR: { top: 16, right: 16, borderLeftWidth: 0, borderBottomWidth: 0 },
    cornerBL: { bottom: 16, left: 16, borderRightWidth: 0, borderTopWidth: 0 },
    cornerBR: { bottom: 16, right: 16, borderLeftWidth: 0, borderTopWidth: 0 },
    qrIdleText: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.3)',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    qrHint: {
        fontSize: 13,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 19,
        maxWidth: 260,
    },
    scanBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 36,
        borderRadius: Radius.full,
        width: '100%',
        ...Shadow.md,
    },
    scanBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
    switchToCodeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: Radius.full,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    switchToCodeText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },

    /* Code Entry Section */
    codeSection: { gap: 20 },
    field: { gap: 8 },
    fieldLabel: { fontSize: 13, fontWeight: '700', color: Colors.text },
    fieldInput: {
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderRadius: Radius.lg,
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 22,
        fontWeight: '800',
        color: Colors.primary,
        backgroundColor: Colors.background,
        letterSpacing: 4,
        textAlign: 'center',
    },
    fieldHint: { fontSize: 12, color: Colors.textMuted, textAlign: 'center', lineHeight: 17 },
    instantBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 11,
        backgroundColor: Colors.primarySurface,
        borderRadius: Radius.md,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    instantBadgeText: { fontSize: 13, fontWeight: '600', color: Colors.primary },
    joinBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: Radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        ...Shadow.md,
    },
    joinBtnDisabled: {
        backgroundColor: Colors.border,
        shadowOpacity: 0,
        elevation: 0,
    },
    joinBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    joinBtnTextDisabled: { color: Colors.textMuted },
    scanInsteadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
    },
    scanInsteadText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
});
