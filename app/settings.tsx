import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Switch, Divider, Text } from "react-native-paper";
import { useTheme } from "@/data/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Navbar from "@/components/Navbar";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);

  const isDark = theme.colors.background === "#0f172a";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Navbar title="Settings" showBack />
      <ScrollView style={styles.scrollView}>
        <List.Section>
          <List.Subheader style={{ color: theme.colors.text }}>
            Appearance
          </List.Subheader>
          <List.Item
            title="Dark Mode"
            description="Toggle dark/light theme"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => <Switch value={isDark} onValueChange={toggleTheme} />}
          />
          <Divider />
          <List.Subheader style={{ color: theme.colors.text }}>
            Notifications
          </List.Subheader>
          <List.Item
            title="Push Notifications"
            description="Receive push notifications"
            left={(props) => <List.Icon {...props} icon="bell-outline" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <List.Item
            title="Email Updates"
            description="Receive email updates"
            left={(props) => <List.Icon {...props} icon="email-outline" />}
            right={() => (
              <Switch value={emailUpdates} onValueChange={setEmailUpdates} />
            )}
          />
          <Divider />
          <List.Subheader style={{ color: theme.colors.text }}>
            Content
          </List.Subheader>
          <List.Item
            title="Auto-play Videos"
            description="Play videos automatically"
            left={(props) => (
              <List.Icon {...props} icon="play-circle-outline" />
            )}
            right={() => (
              <Switch value={autoPlay} onValueChange={setAutoPlay} />
            )}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={{ color: theme.colors.text }}>
            Account
          </List.Subheader>
          <List.Item
            title="Profile"
            description="View and edit your profile"
            left={(props) => <List.Icon {...props} icon="account-outline" />}
            onPress={() => router.push("/profile")}
          />
          <List.Item
            title="Privacy"
            description="Manage your privacy settings"
            left={(props) => <List.Icon {...props} icon="shield-outline" />}
            onPress={() => {}}
          />
          <List.Item
            title="Help & Support"
            description="Get help or contact support"
            left={(props) => (
              <List.Icon {...props} icon="help-circle-outline" />
            )}
            onPress={() => {}}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});
