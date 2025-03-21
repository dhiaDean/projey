import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Bell, User, Menu } from 'lucide-react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

// Define navigation prop type
type NavbarProps = {
  title?: string;
};

export default function Navbar({ title = "Utica" }: NavbarProps) {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={openDrawer}
        accessibilityLabel="Open menu"
      >
        <Menu size={24} color="#1e293b" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('notifications' as never)}
          accessibilityLabel="Notifications"
        >
          <Bell size={22} color="#1e293b" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => navigation.navigate('profile' as never)}
          accessibilityLabel="Profile"
        >
          <User size={22} color="#1e293b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  menuButton: {
    padding: 6,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    fontFamily: 'Inter-SemiBold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    marginLeft: 8,
  },
});