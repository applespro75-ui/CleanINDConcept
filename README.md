# Clean India 🇮🇳
### One QR. One Community. One Clean Corner at a Time.

**Clean India** is a minimalist, QR-first civic coordination platform designed for Indian neighborhoods (gallis) and housing societies. It enables local communities to organize and execute clean-ups within 24 hours by reducing coordination friction—without bureaucracy, complex technology, or centralizing funds.

---

## 🚀 The Core Idea
Clean India is **not** a complaint app or a social media tool. It is a **coordination scaffold** for real-world action.

- **Digital Action Nodes**: Every physical location (a gate, a lane, or a society entrance) becomes a digital node via a permanent QR code.
- **Micro-Action**: Focused on small, local improvements that neighbors can solve themselves.
- **Trust-Based**: Built on human trust and direct peer-to-peer coordination.

## ✨ Key Features

### 🤳 QR-First Entry
No OTPs, no complex sign-ups. Scan a neighborhood QR code to instantly join a local society. Users are limited to tracking a maximum of 2 societies to ensure focused participation.

### 💰 Micro-Pooling (P2P UPI)
When a clean-up is needed, the Admin starts a "Clean-Up Pool".
- **Direct Payments**: Members contribute micro-amounts (₹1–₹₹5) directly to the Admin's UPI QR.
- **Zero Liability**: The app handles **no money**. It only provides the coordination interface.

### 👥 Power Rotation & Governance
- **Monthly Admin Rotation**: Responsibility shifts every month to prevent power concentration and encourage civic participation.
- **Forking (Self-Correction)**: if a society's leadership fails, members can "fork" by creating a new society with a new QR code, allowing the community to migrate naturally.

### 🧹 Micro-Employment Network
A dedicated tab for local volunteers and clean workers. Admins can find, hire, and pay workers directly from pooled funds, creating micro-job opportunities within tiles.

### 🤫 Low-Noise Communication
- **Message Limits**: Users are limited to 3 messages per day per society to prevent spam, "WhatsApp-style" chaos, and unnecessary debates.
- **Action-Oriented**: The focus is strictly on reporting issues and posting before/after proof.

---

## 🛠 Tech Stack
- **Frontend**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Expo Router)
- **Backend/Database**: [Firebase Firestore](https://firebase.google.com/products/firestore)
- **Authentication**: Firebase Anonymous Auth (Zero-friction onboarding)
- **Storage**: Firebase Storage (Auto-deleting images after resolution or 7 days)

---

## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Expo Go](https://expo.dev/expo-go) app on your mobile device (to test)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/applespro75-ui/CleanINDConcept.git
   cd CleanINDConcept
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```

---

## 🌍 Vision
Clean India transforms collective frustration into collective micro-action. It's a self-governed, low-noise, community civic engine that empowers every citizen to reclaim their immediate surroundings—one QR at a time.