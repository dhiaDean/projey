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

  const createStyles = (isDarkTheme: boolean) =>
    StyleSheet.create({
      drawerContent: {
        flex: 1,
        backgroundColor: isDarkTheme ? "#1a1a1a" : "#ffffff",
      },
      userInfoSection: {
        paddingLeft: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: isDarkTheme ? "#333333" : "#f0f0f0",
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
        color: isDarkTheme ? "#ffffff" : "#000000",
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontFamily: "Inter-Regular",
        color: isDarkTheme ? "#aaaaaa" : "#666666",
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: isDarkTheme ? "#333333" : "#f0f0f0",
        borderTopWidth: 1,
        marginTop: "auto",
      },
      preference: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 1,
        paddingHorizontal: 20,
      },
      text: {
        color: isDarkTheme ? "#ffffff" : "#000000",
        fontSize: 16,
        fontFamily: "Inter-Regular",
      },
      switch: {
        marginLeft: 5,
      },
      drawerItemLabel: {
        color: isDarkTheme ? "#ffffff" : "#000000",
        fontFamily: "Inter-Regular",
      },
    });

  const styles = createStyles(isDarkTheme);

  // Handle navigation with proper validation and error handling
  const handleNavigation = (route: string) => {
    try {
      // Close drawer first
      props.navigation.closeDrawer();

      // Navigate using expo-router
      setTimeout(() => {
        router.push(route as any); //added as any to remove the red (made by chef)
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
        <View style={styles.drawerSection}>
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="home-outline"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Home"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/")}
          />
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="book-open-outline"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Catalogue"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/catalogue")}
          />
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="account-group-outline"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Trainers"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/trainers")}
          />
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="certificate-outline"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Certificate"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/certificate")}
          />
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="post-outline"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Blog"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/blog")}
          />
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="handshake-outline"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Partners"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/partners")}
          />
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Search"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/search")}
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.preference}>
          <MaterialCommunityIcons
            name={isDarkTheme ? "moon-waning-crescent" : "white-balance-sunny"}
            color={isDarkTheme ? "#ffffff" : "#000000"}
            size={24}
          />
          <Text style={styles.text}>Dark Theme</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            style={styles.switch}
          />
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Settings"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/settings")}
          />
          <DrawerItem
            icon={({ size }) => (
              <MaterialCommunityIcons
                name="logout"
                color={isDarkTheme ? "#ffffff" : "#666666"}
                size={size}
              />
            )}
            label="Sign Out"
            labelStyle={styles.drawerItemLabel}
            onPress={() => handleNavigation("/auth/index")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;
