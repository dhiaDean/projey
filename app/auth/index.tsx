import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = () => {
    // In a real app, this would authenticate with a backend
    router.replace('/(tabs)');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{isLogin ? 'Connexion' : 'Créer un compte'}</Text>
        <Text style={styles.subtitle}>
          {isLogin 
            ? 'Connectez-vous pour accéder à vos formations' 
            : 'Inscrivez-vous pour commencer votre apprentissage'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        {!isLogin && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre nom"
              value={name}
              onChangeText={setName}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Entrez votre mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
            </TouchableOpacity>
          </View>
        </View>

        {isLogin && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
          <Text style={styles.authButtonText}>{isLogin ? 'Se connecter' : 'S\'inscrire'}</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
              style={styles.socialIcon} 
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }} 
              style={styles.socialIcon} 
            />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {isLogin ? 'Vous n\'avez pas de compte ?' : 'Vous avez déjà un compte ?'}
        </Text>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.footerLink}>{isLogin ? 'S\'inscrire' : 'Se connecter'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 50,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4361ee',
  },
  authButton: {
    backgroundColor: '#4361ee',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    height: 50,
    width: '48%',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  footerLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4361ee',
    marginLeft: 5,
  },
});