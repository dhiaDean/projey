import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ProgressBar } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [profile, setProfile] = useState({
    image: 'https://via.placeholder.com/100',
    username: 'John Doe',
    bio: 'Lifelong learner and coding enthusiast',
    role: 'Student',
    completedCourses: 5,
    ongoingCourses: 2,
    certifications: 3,
    email: 'johndoe@example.com',
    phone: '+1234567890',
    location: 'New York, USA',
    skills: ['JavaScript', 'React Native', 'UI/UX Design', 'Python'],
    streak: 15,
    joinDate: 'Jan 2024',
    totalHours: 87,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Sorry, we need camera roll permissions to change your profile picture.'
            );
          }
        }
      })();
    }, [])
  );

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setProfile({ ...profile, image: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return (
          <View style={[styles.card, isDarkMode && styles.darkCard]}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, isDarkMode && styles.darkText]}>
                  {profile.completedCourses}
                </Text>
                <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>
                  Completed
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, isDarkMode && styles.darkText]}>
                  {profile.ongoingCourses}
                </Text>
                <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>
                  In Progress
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, isDarkMode && styles.darkText]}>
                  {profile.certifications}
                </Text>
                <Text style={[styles.statLabel, isDarkMode && styles.darkSubText]}>
                  Certificates
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
                  Learning Progress
                </Text>
                <Text style={[styles.progressText, isDarkMode && styles.darkSubText]}>
                  {profile.completedCourses}/10 courses
                </Text>
              </View>
              <ProgressBar
                progress={profile.completedCourses / 10}
                color="#4D7CFE"
                style={styles.progressBar}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.statsDetails}>
              <View style={styles.statDetail}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={isDarkMode ? '#AAB8C2' : '#64748B'}
                />
                <Text style={[styles.statDetailText, isDarkMode && styles.darkSubText]}>
                  {profile.totalHours} hours of learning
                </Text>
              </View>
              <View style={styles.statDetail}>
                <Ionicons
                  name="flame-outline"
                  size={20}
                  color={isDarkMode ? '#AAB8C2' : '#64748B'}
                />
                <Text style={[styles.statDetailText, isDarkMode && styles.darkSubText]}>
                  {profile.streak} day streak
                </Text>
              </View>
              <View style={styles.statDetail}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={isDarkMode ? '#AAB8C2' : '#64748B'}
                />
                <Text style={[styles.statDetailText, isDarkMode && styles.darkSubText]}>
                  Joined {profile.joinDate}
                </Text>
              </View>
            </View>
          </View>
        );
      case 'skills':
        return (
          <View style={[styles.card, isDarkMode && styles.darkCard]}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              My Skills
            </Text>
            <View style={styles.skillsContainer}>
              {profile.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
              {isEditing && (
                <TouchableOpacity
                  style={[styles.skillBadge, styles.addSkillBadge]}
                  onPress={() => Alert.alert('Add Skill', 'Add skill functionality would go here')}
                >
                  <Ionicons name="add" size={16} color="#FFFFFF" />
                  <Text style={styles.skillText}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.divider} />
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Recommended Courses
            </Text>
            <Text style={[styles.emptyStateText, isDarkMode && styles.darkSubText]}>
              Based on your skills and progress, we'll suggest courses here.
            </Text>
          </View>
        );
      case 'info':
        return (
          <View style={[styles.card, isDarkMode && styles.darkCard]}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Personal Information
            </Text>
            {isEditing ? (
              <>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, isDarkMode && styles.darkInput]}
                    value={profile.username}
                    onChangeText={(text) => setProfile({ ...profile, username: text })}
                    placeholder="Full Name"
                    placeholderTextColor={isDarkMode ? '#AAB8C2' : '#A0AEC0'}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, isDarkMode && styles.darkInput]}
                    value={profile.email}
                    onChangeText={(text) => setProfile({ ...profile, email: text })}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor={isDarkMode ? '#AAB8C2' : '#A0AEC0'}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, isDarkMode && styles.darkInput]}
                    value={profile.phone}
                    onChangeText={(text) => setProfile({ ...profile, phone: text })}
                    placeholder="Phone"
                    keyboardType="phone-pad"
                    placeholderTextColor={isDarkMode ? '#AAB8C2' : '#A0AEC0'}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, isDarkMode && styles.darkInput]}
                    value={profile.location}
                    onChangeText={(text) => setProfile({ ...profile, location: text })}
                    placeholder="Location"
                    placeholderTextColor={isDarkMode ? '#AAB8C2' : '#A0AEC0'}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, isDarkMode && styles.darkInput, styles.multilineInput]}
                    value={profile.bio}
                    onChangeText={(text) => setProfile({ ...profile, bio: text })}
                    placeholder="Bio"
                    multiline
                    numberOfLines={3}
                    placeholderTextColor={isDarkMode ? '#AAB8C2' : '#A0AEC0'}
                  />
                </View>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                  />
                  <Text style={[styles.infoText, isDarkMode && styles.darkSubText]}>
                    {profile.email}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                  />
                  <Text style={[styles.infoText, isDarkMode && styles.darkSubText]}>
                    {profile.phone}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                  />
                  <Text style={[styles.infoText, isDarkMode && styles.darkSubText]}>
                    {profile.location}
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={isDarkMode ? '#AAB8C2' : '#64748B'}
                  />
                  <Text style={[styles.infoText, isDarkMode && styles.darkSubText]}>
                    {profile.bio}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                  <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDarkMode && styles.darkText]}>
            Profile
          </Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Settings', 'Settings would open here')}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
            <View style={styles.editImageButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.username, isDarkMode && styles.darkText]}>
            {profile.username}
          </Text>
          <Text style={[styles.role, isDarkMode && styles.darkSubText]}>
            {profile.role}
          </Text>
          <View style={styles.achievementBadge}>
            <FontAwesome5 name="award" size={12} color="#FFFFFF" />
            <Text style={styles.achievementText}>Top Learner</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            onPress={() => setActiveTab('stats')}
          >
            <Ionicons
              name={activeTab === 'stats' ? 'stats-chart' : 'stats-chart-outline'}
              size={20}
              color={activeTab === 'stats' ? '#4D7CFE' : isDarkMode ? '#AAB8C2' : '#64748B'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'stats' && styles.activeTabText,
                isDarkMode && activeTab !== 'stats' && styles.darkSubText,
              ]}
            >
              Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'skills' && styles.activeTab]}
            onPress={() => setActiveTab('skills')}
          >
            <MaterialIcons
              name="lightbulb"
              size={20}
              color={activeTab === 'skills' ? '#4D7CFE' : isDarkMode ? '#AAB8C2' : '#64748B'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'skills' && styles.activeTabText,
                isDarkMode && activeTab !== 'skills' && styles.darkSubText,
              ]}
            >
              Skills
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}
          >
            <Ionicons
              name={activeTab === 'info' ? 'person' : 'person-outline'}
              size={20}
              color={activeTab === 'info' ? '#4D7CFE' : isDarkMode ? '#AAB8C2' : '#64748B'}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'info' && styles.activeTabText,
                isDarkMode && activeTab !== 'info' && styles.darkSubText,
              ]}
            >
              Info
            </Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A202C',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkSubText: {
    color: '#AAB8C2',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4D7CFE',
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4D7CFE',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#F7F9FC',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  role: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4D7CFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  achievementText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#F0F5FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#4D7CFE',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  progressSection: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  statsDetails: {
    marginTop: 8,
  },
  statDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statDetailText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: '#4D7CFE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSkillBadge: {
    backgroundColor: '#64748B',
  },
  skillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 12,
    flex: 1,
  },
  editButton: {
    backgroundColor: '#4D7CFE',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F7F9FC',
  },
  darkInput: {
    backgroundColor: '#2D2D2D',
    borderColor: '#3D3D3D',
    color: '#FFFFFF',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A202C',
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  saveButton: {
    backgroundColor: '#4D7CFE',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomPadding: {
    height: 24,
  },
});

export default ProfileScreen;