import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AvatarPicker = ({ avatars, onSelectAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarPress = (avatar) => {
    setSelectedAvatar(avatar);
    onSelectAvatar(avatar);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            onPress={() => handleAvatarPress(avatar)}
            style={[
              styles.avatarContainer,
              selectedAvatar?.id === avatar.id && styles.selectedAvatarContainer,
            ]}
          >
            <Image source={{ uri: avatar.url }} style={styles.avatar} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginBottom: 20,
  },
  avatarContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginRight: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAvatarContainer: {
    borderColor: '#00C4FF',
    borderWidth: 2,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default AvatarPicker;
