import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleIncrement = () => setCount(prev => prev + 1);

  const handleDecrement = () => {
    if (count > 0) setCount(prev => prev - 1);
  };

  const handleReset = () => setCount(0);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = isDarkMode ? styles.dark : styles.light;

  return (
    <View style={[styles.container, theme.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a2e' : '#ffffff'}
      />

      {/* Counter Display */}
      <View style={[styles.counterBox, theme.counterBox]}>
        <Text style={[styles.counterValue, theme.text]}>{count}</Text>
      </View>

      {/* Increment & Decrement Buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btnPrimary, styles.btnHalf]}
          onPress={handleIncrement}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnSecondary, styles.btnHalf, theme.btnSecondary]}
          onPress={handleDecrement}
          activeOpacity={count === 0 ? 1 : 0.8}
        >
          <Text style={[styles.btnSecondaryText, theme.btnSecondaryText, count === 0 && styles.disabledText]}>
            −
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reset Button */}
      <TouchableOpacity
        style={[styles.btnReset, theme.btnReset]}
        onPress={handleReset}
        activeOpacity={0.7}
      >
        <Text style={[styles.btnResetText, theme.btnResetText]}> RESET</Text>
      </TouchableOpacity>

      {/* Theme Toggle Button */}
      <TouchableOpacity
        style={[styles.btnTheme, theme.btnTheme]}
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        <Text style={[styles.btnThemeText, theme.btnThemeText]}>
          {isDarkMode ? 'Switch to Light Mode' : ' Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  counterBox: {
    width: 180,
    height: 180,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  counterValue: {
    fontSize: 80,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 12,
  },
  btnHalf: {
    flex: 1,
  },
  btnPrimary: {
    backgroundColor: '#4f46e5',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 32,
  },
  btnSecondary: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 32,
  },
  disabledText: {
    opacity: 0.3,
  },
  btnReset: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginBottom: 10,
  },
  btnResetText: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
  },
  btnTheme: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnThemeText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  // Light theme
  light: {
    container: { backgroundColor: '#ffffff' },
    text: { color: '#1a1a2e' },
    counterBox: { backgroundColor: '#f5f3ff' },
    btnSecondary: { backgroundColor: '#f0f0f5' },
    btnSecondaryText: { color: '#1a1a2e' },
    btnReset: { borderColor: '#e0e0e8' },
    btnResetText: { color: '#999999' },
    btnTheme: { backgroundColor: '#f5f3ff' },
    btnThemeText: { color: '#4f46e5' },
  },

  // Dark theme
  dark: {
    container: { backgroundColor: '#1a1a2e' },
    text: { color: '#ffffff' },
    counterBox: { backgroundColor: '#2a2440' },
    btnSecondary: { backgroundColor: '#2a2a3e' },
    btnSecondaryText: { color: '#ffffff' },
    btnReset: { borderColor: '#3a3a4e' },
    btnResetText: { color: '#666688' },
    btnTheme: { backgroundColor: '#2a2440' },
    btnThemeText: { color: '#a89cf7' },
  },
});
