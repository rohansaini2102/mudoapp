import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { Icon } from './Icon';
import { Colors, Typography, Spacing, BorderRadius, GlassMorphism } from '../constants/theme';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

interface MediaPickerProps {
  onImageSelected: (uri: string) => void;
  onCancel?: () => void;
  currentImage?: string | null;
}

export function MediaPicker({ onImageSelected, onCancel, currentImage }: MediaPickerProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage || null);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert(
        'Permissions Required',
        'Please enable camera and photo library access to use this feature.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedImage(null);
    onImageSelected('');
  };

  if (selectedImage) {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
          <BlurView intensity={60} tint="dark" style={styles.removeButtonBlur}>
            <Icon name="close" size={16} color="#FFFFFF" />
          </BlurView>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={takePhoto}>
        <View style={styles.iconWrapper}>
          {Platform.OS === 'ios' ? (
            <BlurView intensity={30} tint="light" style={styles.iconContainer}>
              <Icon name="camera" size={24} color={Colors.primary} />
            </BlurView>
          ) : (
            <View style={styles.androidIconContainer}>
              <Icon name="camera" size={24} color={Colors.primary} />
            </View>
          )}
        </View>
        <Text style={styles.optionText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={pickImage}>
        <View style={styles.iconWrapper}>
          {Platform.OS === 'ios' ? (
            <BlurView intensity={30} tint="light" style={styles.iconContainer}>
              <Icon name="images" size={24} color={Colors.primary} />
            </BlurView>
          ) : (
            <View style={styles.androidIconContainer}>
              <Icon name="images" size={24} color={Colors.primary} />
            </View>
          )}
        </View>
        <Text style={styles.optionText}>Choose from Library</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginVertical: Spacing.lg,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrapper: {
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    ...GlassMorphism.shadow.glassSubtle,
  },
  iconContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlassMorphism.backgroundColor.card,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.default,
  },
  androidIconContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlassMorphism.backgroundColor.cardAndroid,
    borderRadius: BorderRadius.large,
    borderWidth: 1,
    borderColor: GlassMorphism.borderColor.subtle,
  },
  optionText: {
    ...Typography.caption1,
    color: Colors.label,
    fontWeight: '500',
  },
  imageContainer: {
    marginVertical: Spacing.lg,
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.large,
  },
  removeButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  removeButtonBlur: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});