import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, CircleCheck as CheckCircle } from 'lucide-react-native';
import Navbar from '@/components/Navbar';

export default function CertificateScreen() {
  const [certificateCode, setCertificateCode] = useState('');
  const [validationResult, setValidationResult] = useState<null | { valid: boolean; data?: any }>(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const validateCertificate = () => {
    setIsLoading(true); // Start loading
    // Mock validation - in a real app, this would call an API
    setTimeout(() => {
      if (certificateCode === '123456') {
        setValidationResult({
          valid: true,
          data: {
            name: 'Muhammad Murad',
            course: 'Fundraising Masterclass',
            date: '15 Juin 2025',
            instructor: 'John Doe',
          },
        });
      } else {
        setValidationResult({ valid: false });
      }
      setIsLoading(false); // Stop loading
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Navbar />
      
      <View style={styles.header}>
        <Text style={styles.title}>Validation du certificat</Text>
        <Text style={styles.subtitle}>Vérifiez l'authenticité d'un certificat en entrant son code</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez le code du certificat"
            placeholderTextColor="#94a3b8"
            value={certificateCode}
            onChangeText={setCertificateCode}
            editable={!isLoading} // Disable input while loading
          />
        </View>
        <TouchableOpacity 
          style={[styles.validateButton, isLoading && styles.disabledButton]} 
          onPress={validateCertificate}
          disabled={isLoading} // Disable button while loading
        >
          <Text style={styles.validateButtonText}>
            {isLoading ? 'Validation en cours...' : 'Valider'}
          </Text>
        </TouchableOpacity>
      </View>

      {validationResult && (
        <View style={styles.resultContainer}>
          {validationResult.valid ? (
            <>
              <View style={styles.validBadge}>
                <CheckCircle size={24} color="#10b981" />
                <Text style={styles.validText}>Certificat valide</Text>
              </View>
              
              <View style={styles.certificateCard}>
                <View style={styles.certificateHeader}>
                  <Text style={styles.certificateTitle}>Certificat d'accomplissement</Text>
                </View>
                <View style={styles.certificateContent}>
                  <Text style={styles.certificateLabel}>Nom</Text>
                  <Text style={styles.certificateValue}>{validationResult.data.name}</Text>
                  
                  <Text style={styles.certificateLabel}>Formation</Text>
                  <Text style={styles.certificateValue}>{validationResult.data.course}</Text>
                  
                  <Text style={styles.certificateLabel}>Date d'obtention</Text>
                  <Text style={styles.certificateValue}>{validationResult.data.date}</Text>
                  
                  <Text style={styles.certificateLabel}>Formateur</Text>
                  <Text style={styles.certificateValue}>{validationResult.data.instructor}</Text>
                </View>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadButtonText}>Télécharger le certificat</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.invalidResult}>
              <Text style={styles.invalidText}>Certificat invalide</Text>
              <Text style={styles.invalidDescription}>
                Le code que vous avez entré n'est pas valide. Veuillez vérifier et réessayer.
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 15,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  validateButton: {
    backgroundColor: '#4361ee',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#94a3b8', // Change button color when disabled
  },
  validateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  resultContainer: {
    paddingHorizontal: 20,
  },
  validBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  validText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#10b981',
    marginLeft: 10,
  },
  certificateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  certificateHeader: {
    backgroundColor: '#4361ee',
    padding: 20,
    alignItems: 'center',
  },
  certificateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  certificateContent: {
    padding: 20,
  },
  certificateLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
    marginBottom: 5,
  },
  certificateValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 15,
  },
  downloadButton: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4361ee',
  },
  invalidResult: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    padding: 20,
  },
  invalidText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
    marginBottom: 5,
  },
  invalidDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#b91c1c',
  },
});