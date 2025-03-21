
import { router, useNavigation, useRootNavigation, useSegments } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

// Define your route paths with more accurate typing
export type AppRoutePath =
  | '/'
  | '/profile'
  | '/catalogue'
  | '/trainers'
  | '/certificate'
  | '/blog'
  | '/partners'
  | '/settings'
  | '/auth/index'
  | '/(tabs)'
  | '/(tabs)/index'
  | '/(tabs)/catalogue'
  | '/(tabs)/trainers'
  | '/(tabs)/blog'
  | '/search';

// Make AppRoutes compatible with router.push
export type AppRoutes = AppRoutePath | { pathname: AppRoutePath; params?: Record<string, string> };

export const navigateTo = (route: AppRoutes) => {
  router.push(route as any);
};

export const goBack = () => {
  try {
    const navigation = useNavigation();
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Fallback to home if can't go back
      router.replace('/');
    }
  } catch (error) {
    console.error('Navigation error:', error);
    // Safe fallback
    router.replace('/');
  }
};

// Function to open the drawer menu
export const openDrawer = () => {
  const navigation = useNavigation();
  try {
    navigation.dispatch(DrawerActions.openDrawer());
  } catch (error) {
    console.error('Error opening drawer:', error);
  }
};

// Function to close the drawer menu
export const closeDrawer = () => {
  const navigation = useNavigation();
  try {
    navigation.dispatch(DrawerActions.closeDrawer());
  } catch (error) {
    console.error('Error closing drawer:', error);
  }
};

// Update the tab navigation function to use the AppRoutes type
export const navigateToTab = (tabName: 'index' | 'catalogue' | 'trainers' | 'blog') => {
  const route = `/(tabs)/${tabName}` as AppRoutePath;
  router.push(route as any);
};

// Get the current route name
export const getCurrentRoute = (): string => {
  const segments = useSegments();
  return segments.join('/');
};
