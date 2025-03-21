import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Switch,
  Text,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { navigateTo } from "@/data/navigation";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Handle navigation with proper validation and error handling
  const handleNavigation = (route: string) => {
    try {
      // Close drawer first
      props.navigation.closeDrawer();

      // Navigate using expo-router
      setTimeout(() => {
        router.push(route);
      }, 0);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <View style={styles.drawerContent}>
        {/* User Section */}
        <View style={styles.userInfoSection}>
          <TouchableOpacity
            style={styles.userInfoHeader}
            onPress={() => handleNavigation("/profile")}
          >
            <Avatar.Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              size={50}
            />
            <View style={styles.userDetails}>
              <Title style={styles.title}>Guest User</Title>
              <Caption style={styles.caption}>guest@example.com</Caption>
            </View>
          </TouchableOpacity>
        </View>

        {/* Drawer Sections */}
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="home-outline"
                color={color}
                size={size}
              />
            )}
            label="Home"
            onPress={() => handleNavigation("/")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="book-open-outline"
                color={color}
                size={size}
              />
            )}
            label="Catalogue"
            onPress={() => handleNavigation("/catalogue")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                color={color}
                size={size}
              />
            )}
            label="Trainers"
            onPress={() => handleNavigation("/trainers")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="certificate-outline"
                color={color}
                size={size}
              />
            )}
            label="Certificate"
            onPress={() => handleNavigation("/certificate")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="post-outline"
                color={color}
                size={size}
              />
            )}
            label="Blog"
            onPress={() => handleNavigation("/blog")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="handshake-outline"
                color={color}
                size={size}
              />
            )}
            label="Partners"
            onPress={() => handleNavigation("/partners")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            )}
            label="Search"
            onPress={() => handleNavigation("/search")}
          />
        </Drawer.Section>

        {/* Preferences Section */}
        <Drawer.Section title="Preferences">
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <View>
              <Switch value={isDarkTheme} onValueChange={toggleTheme} />
            </View>
          </View>
        </Drawer.Section>

        {/* Bottom Section */}
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={size}
              />
            )}
            label="Settings"
            onPress={() => handleNavigation("/settings")}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Sign Out"
            onPress={() => handleNavigation("/auth/index")}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  userInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    marginLeft: 15,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: "Inter-Regular",
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f0f0f0",
    borderTopWidth: 1,
    marginTop: "auto",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default CustomDrawerContent;
