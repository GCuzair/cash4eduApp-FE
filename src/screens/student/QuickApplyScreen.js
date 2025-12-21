import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../context/ProfileContext';
import { FireApi } from '../../utils/FireApi';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const DOCUMENT_TYPES = [
  { key: 'resume', label: 'Resume' },
  { key: 'transcript', label: 'Transcript' },
  { key: 'letter', label: 'Letter of Recommendation' },
  { key: 'fafsa', label: 'FAFSA Summary' },
];

// ========================
// MAIN COMPONENT (NO PACKAGES)
// ========================
const QuickApplyScreen = ({ navigation }) => {
  const { userProfile } = useContext(ProfileContext);
  const [agree, setAgree] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectionMode, setSelectionMode] = useState(null); // For tracking which doc type is being selected

  // State to hold selected files for each document type
  const [selectedDocuments, setSelectedDocuments] = useState({
    resume: null,
    transcript: null,
    letter: null,
    fafsa: null,
  });

  // ========================
  // FILE PICKING FUNCTIONS (State-based only)
  // ========================

  const showFileSourceOptions = (documentType) => {
    setSelectionMode(documentType);
    Alert.alert(
      `Select ${DOCUMENT_TYPES.find(d => d.key === documentType)?.label}`,
      'Choose how to add your document:',
      [
        {
          text: 'Take a Photo (Simulated)',
          onPress: () => handleTakePhoto(documentType),
        },
        {
          text: 'Select File (Simulated)',
          onPress: () => handleSelectFile(documentType),
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setSelectionMode(null),
        },
      ],
      { cancelable: true }
    );
  };

  /**
   * Simulates taking a photo by creating a mock file object
   */
  const handleTakePhoto = (documentType) => {
    // Create a mock file object with camera properties
    const mockFile = {
      uri: `file://camera_${documentType}_${Date.now()}.jpg`,
      name: `camera_${documentType}_${Date.now()}.jpg`,
      type: 'image/jpeg',
      source: 'camera',
      size: Math.floor(Math.random() * 2000000) + 100000, // 100KB - 2MB
    };
    
    handleFileSelected(documentType, mockFile);
    setSelectionMode(null);
  };

  /**
   * Simulates selecting a file by creating a mock file object
   */
  const handleSelectFile = (documentType) => {
    // Create a mock file object with gallery properties
    const fileTypes = [
      { ext: '.pdf', type: 'application/pdf', name: 'document' },
      { ext: '.jpg', type: 'image/jpeg', name: 'photo' },
      { ext: '.png', type: 'image/png', name: 'image' },
      { ext: '.doc', type: 'application/msword', name: 'document' },
    ];
    
    const randomType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const mockFile = {
      uri: `file://storage/${documentType}_${Date.now()}${randomType.ext}`,
      name: `${randomType.name}_${documentType}_${Date.now()}${randomType.ext}`,
      type: randomType.type,
      source: 'gallery',
      size: Math.floor(Math.random() * 5000000) + 500000, // 500KB - 5MB
    };
    
    handleFileSelected(documentType, mockFile);
    setSelectionMode(null);
  };

  /**
   * Updates the state with the selected file
   */
  const handleFileSelected = (documentType, file) => {
    if (!file) return;

    setSelectedDocuments(prev => ({
      ...prev,
      [documentType]: {
        localUri: file.uri,
        name: file.name,
        type: file.type,
        size: file.size,
        source: file.source,
        documentType: documentType,
        uploaded: false, // Track if uploaded to server
      },
    }));

    // Show success toast
    Toast.show({
      type: 'success',
      text1: 'File Selected',
      text2: `${DOCUMENT_TYPES.find(d => d.key === documentType)?.label} added successfully.`,
    });
  };

  /**
   * Removes a selected file
   */
  const handleRemoveFile = (documentType) => {
    setSelectedDocuments(prev => ({
      ...prev,
      [documentType]: null,
    }));
    Toast.show({
      type: 'info',
      text1: 'File Removed',
      text2: 'You can select a different file.',
    });
  };

  /**
   * Simulates file upload with progress
   */
  const simulateFileUpload = async (documentType, file) => {
    return new Promise((resolve) => {
      // Simulate upload delay
      const uploadTime = Math.random() * 2000 + 1000; // 1-3 seconds
      
      setTimeout(() => {
        // Mark as uploaded
        setSelectedDocuments(prev => ({
          ...prev,
          [documentType]: {
            ...prev[documentType],
            uploaded: true,
            document_url: `https://storage.example.com/${file.name}`,
            public_id: `doc_${Date.now()}`,
            format: file.type.split('/')[1] || 'jpg',
          },
        }));
        resolve({
          document_type: documentType,
          document_url: `https://storage.example.com/${file.name}`,
          public_id: `doc_${Date.now()}`,
          filename: file.name,
          format: file.type.split('/')[1] || 'jpg',
        });
      }, uploadTime);
    });
  };

  // ========================
  // API UPLOAD FUNCTION
  // ========================
  const handleSubmit = async () => {
    if (!agree) {
      Toast.show({
        type: 'error',
        text1: 'Agreement Required',
        text2: 'Please agree to use your uploaded documents to continue.',
      });
      return;
    }

    // Filter to only document types that have a file selected
    const documentsToUpload = Object.entries(selectedDocuments)
      .filter(([_, file]) => file !== null)
      .map(([docType, file]) => file);

    if (documentsToUpload.length === 0) {
      Toast.show({
        type: 'info',
        text1: 'No Documents',
        text2: 'You can continue without uploading documents now.',
      });
      navigation.navigate('Notification');
      return;
    }

    setUploading(true);

    try {
      // First simulate uploading each file to get the URLs
      const uploadPromises = documentsToUpload.map(async (file) => {
        return await simulateFileUpload(file.documentType, file);
      });

      const uploadedDocs = await Promise.all(uploadPromises);

      const payload = {
        user_id: userProfile?.id?.toString() || 'unknown_user',
        documents: uploadedDocs,
      };

      console.log('Sending payload:', payload);

      const result = await FireApi('documents-profile', 'POST', {}, payload);

      if (result) {
        Toast.show({
          type: 'success',
          text1: 'Success!',
          text2: result.message || 'Your documents have been uploaded successfully.',
          visibilityTime: 4000,
        });
        
        // Navigate after showing success message
        setTimeout(() => {
          navigation.navigate('Notification');
        }, 2000);
      } else {
        throw new Error('Upload failed - no response from server');
      }
    } catch (error) {
      console.error('Upload Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Upload Failed',
        text2: error.message || 'Could not upload documents. Please try again.',
      });
    } finally {
      setUploading(false);
    }
  };

  // ========================
  // UPLOAD SECTION COMPONENT
  // ========================
  const UploadSection = ({ documentType, title, description }) => {
    const file = selectedDocuments[documentType];
    const isSelecting = selectionMode === documentType;

    return (
      <View style={styles.uploadSection}>
        <Icon 
          name={file ? "document-text" : "cloud-upload-outline"} 
          size={34} 
          color={file ? "#4CAF50" : "#03A2D5"} 
          style={{ marginBottom: 8 }} 
        />
        <Text style={styles.uploadTitle}>{title}</Text>
        <Text style={styles.uploadDesc}>{description}</Text>

        {/* Show selected file info */}
        {file ? (
          <View style={styles.selectedFileContainer}>
            <View style={styles.fileInfo}>
              <Icon 
                name="document-text-outline" 
                size={20} 
                color={file.uploaded ? "#4CAF50" : "#FFA726"} 
              />
              <View style={styles.fileDetails}>
                <Text style={styles.selectedFileName} numberOfLines={1}>
                  {file.name}
                </Text>
                <Text style={styles.fileSize}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB • {file.source}
                </Text>
                {file.uploaded && (
                  <Text style={styles.uploadStatus}>
                    <Icon name="checkmark-circle" size={12} color="#4CAF50" /> Uploaded
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => handleRemoveFile(documentType)}
              disabled={uploading}
            >
              <Icon name="close-circle" size={22} color={uploading ? "#999" : "#FF5252"} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadBtnGroup}>
            <TouchableOpacity 
              style={[
                styles.uploadBtn, 
                (isSelecting || uploading) && styles.uploadBtnDisabled
              ]}
              onPress={() => showFileSourceOptions(documentType)}
              disabled={isSelecting || uploading}
            >
              {isSelecting ? (
                <ActivityIndicator size="small" color="#03A2D5" />
              ) : (
                <>
                  <Icon name="camera-outline" size={18} color="#03A2D5" />
                  <Text style={styles.uploadBtnText}>Take a Photo</Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.uploadBtn, 
                (isSelecting || uploading) && styles.uploadBtnDisabled
              ]}
              onPress={() => showFileSourceOptions(documentType)}
              disabled={isSelecting || uploading}
            >
              {isSelecting ? (
                <ActivityIndicator size="small" color="#03A2D5" />
              ) : (
                <>
                  <Icon name="folder-outline" size={18} color="#03A2D5" />
                  <Text style={styles.uploadBtnText}>Select File</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // ========================
  // RENDER
  // ========================
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#01D7FB', '#0257A7']} style={styles.headerGradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Up Quick Apply</Text>
          <Text style={styles.headerProgress}>
            {userProfile?.profile_completion_percentage || 0}% Completed
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerDescription}>
          Quick apply saves you an average of 3+ hours!
        </Text>
        <Text style={styles.headerLabel}>
          You can skip any question and update it later in settings
        </Text>
        <Text style={styles.label}>Upload Optional Documents</Text>

        {/* Upload Sections */}
        <UploadSection
          documentType="resume"
          title="Upload Resume"
          description="Upload a recent resume or scan one using your camera. We'll convert images to readable PDFs automatically."
        />
        <UploadSection
          documentType="transcript"
          title="Upload Transcript"
          description="You can upload your latest transcript or snap a photo we'll clean and convert it into a PDF."
        />
        <UploadSection
          documentType="letter"
          title="Upload Letter"
          description="Add your letter of recommendation now or skip you can upload it later anytime."
        />
        <UploadSection
          documentType="fafsa"
          title="Upload FAFSA Summary"
          description="If available, upload your FAFSA or financial summary. It helps us pre-qualify need-based scholarships."
        />

        {/* Progress Summary */}
        {uploading && (
          <View style={styles.progressSummary}>
            <Text style={styles.progressText}>
              Uploading {Object.values(selectedDocuments).filter(f => f && !f.uploaded).length} files...
            </Text>
            <ActivityIndicator size="large" color="#03A2D5" />
          </View>
        )}

        {/* Checkbox */}
        <TouchableOpacity
          style={[styles.checkboxRow, uploading && styles.checkboxRowDisabled]}
          onPress={() => !uploading && setAgree(!agree)}
          disabled={uploading}
        >
          <Icon
            name={agree ? 'checkbox-outline' : 'square-outline'}
            size={22}
            color={uploading ? "#666" : "#03A2D5"}
          />
          <Text style={[styles.checkboxLabel, uploading && { color: '#666' }]}>
            I agree to use my uploaded documents and profile for faster scholarship applications.
          </Text>
        </TouchableOpacity>

        {/* Continue Button with Loader */}
        <TouchableOpacity
          style={[
            styles.continueBtn, 
            uploading && styles.continueBtnDisabled,
            !agree && styles.continueBtnDisabled
          ]}
          onPress={handleSubmit}
          disabled={uploading || !agree}
        >
          {uploading ? (
            <>
              <ActivityIndicator size="small" color="#03A2D5" />
              <Text style={styles.uploadingText}>Uploading...</Text>
            </>
          ) : (
            <Text style={styles.continueText}>Continue</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => !uploading && navigation.navigate('Notification')}
          disabled={uploading}
        >
          <Text style={[styles.saveLaterText, uploading && { color: '#444' }]}>
            Save and continue Later
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Toast Component */}
      <Toast />
    </View>
  );
};

// ========================
// STYLES
// ========================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerGradient: { width, marginTop: 10 },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  label: { color: '#fff', fontSize: 16, fontWeight: '500', marginBottom: 6 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '500', marginRight: 60 },
  headerProgress: { color: '#fff', fontSize: 13 },
  scrollContainer: { paddingBottom: 30, paddingHorizontal: 10 },
  headerDescription: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  headerLabel: { color: '#8E8E8E', fontSize: 13, marginBottom: 15 },
  uploadSection: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderColor: '#03A2D5',
    borderWidth: 1,
  },
  uploadTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 5 },
  uploadDesc: { 
    color: '#fff', 
    fontSize: 14, 
    textAlign: 'center', 
    marginBottom: 10, 
    paddingHorizontal: 30,
  },
  uploadBtnGroup: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    gap: 10,
  },
  uploadBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    elevation: 8,
    minWidth: 140,
    justifyContent: 'center',
  },
  uploadBtnDisabled: {
    opacity: 0.5,
  },
  uploadBtnText: { color: '#03A2D5', fontSize: 14, fontWeight: '600' },
  // Selected file styles
  selectedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#03A2D5',
    marginTop: 5,
    width: '90%',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  fileDetails: {
    flex: 1,
  },
  selectedFileName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  fileSize: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 2,
  },
  uploadStatus: {
    color: '#4CAF50',
    fontSize: 11,
    marginTop: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  checkboxRowDisabled: {
    opacity: 0.5,
  },
  checkboxLabel: {
    color: '#ccc',
    fontSize: 13,
    marginLeft: 10,
    flex: 1,
  },
  continueBtn: {
    borderColor: '#03A2D5',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 25,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  continueBtnDisabled: {
    opacity: 0.5,
  },
  continueText: { 
    color: '#03A2D5', 
    fontSize: 24, 
    fontWeight: '600',
  },
  uploadingText: {
    color: '#03A2D5',
    fontSize: 18,
    fontWeight: '600',
  },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  progressSummary: {
    backgroundColor: 'rgba(3, 162, 213, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#03A2D5',
  },
  progressText: {
    color: '#03A2D5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default QuickApplyScreen;