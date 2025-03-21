import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawerContent from "../components/CustomDrawerContent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeContext, lightTheme, darkTheme } from "../data/theme";

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme === 'dark' ? darkTheme : lightTheme);

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      if (savedTheme) {
        setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('themePreference', newTheme === darkTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  if (!fontsLoaded && !fontError) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading...</Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerStyle: { 
              backgroundColor: theme.colors.card,
              width: 260 
            },
            drawerType: "front",
            overlayColor: "rgba(0,0,0,0.2)",
            swipeEnabled: true,
            gestureEnabled: true,
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen 
            name="index" 
            options={{ 
              title: "Home",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="(tabs)" 
            options={{ 
              title: "Tabs",
              headerShown: false 
            }} 
          />
          <Drawer.Screen 
            name="search" 
            options={{ 
              title: "Search",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="blog" 
            options={{ 
              title: "Blog",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="catalogue" 
            options={{ 
              title: "Catalogue",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="certificate" 
            options={{ 
              title: "Certificate",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="partners" 
            options={{ 
              title: "Partners",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="trainers" 
            options={{ 
              title: "Formateurs",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="trainer-details" 
            options={{ 
              title: "Détails Formateur",
              headerShown: false,
              drawerItemStyle: { display: 'none' }
            }} 
          />
          <Drawer.Screen 
            name="settings" 
            options={{ 
              title: "Settings",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="profile" 
            options={{ 
              title: "Profile",
              headerShown: false
            }} 
          />
          <Drawer.Screen 
            name="auth" 
            options={{ 
              headerShown: false, 
              drawerItemStyle: { display: 'none' }
            }} 
          />
        </Drawer>
        <StatusBar style={theme === darkTheme ? "light" : "dark"} />
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
  },
});