/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Modal,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

export const MenuModal = ({visible, onClose, onStartDrawing}: any) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalContainer}>
      <Button title="Start Drawing" onPress={onStartDrawing} />
      <Button title="Close" onPress={onClose} />
    </View>
  </Modal>
);

export const SavedAreasModal = ({
  visible,
  onClose,
  shapes,
  selectedShape,
  onSelectShape,
}: any) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.savedAreasModalContainer}>
      <Text>Saved Areas</Text>
      <FlatList
        data={shapes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              onSelectShape(item);
              onClose();
            }}
            style={[
              styles.listItemContainer,
              selectedShape?.name === item.name && {
                backgroundColor: '#DFFFD6',
              },
            ]}>
            <Text style={styles.listItemTitle}>{item.name}</Text>
            <Text style={styles.listItemText}>Area: {item.areaSF} SF</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Close" onPress={onClose} />
    </View>
  </Modal>
);

export const NameModal = ({visible, shapeName, setShapeName, onSave}: any) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.nameModalContainer}>
      <Text style={styles.inputLabel}>Enter Shape Name:</Text>
      <TextInput
        style={styles.input}
        value={shapeName}
        onChangeText={setShapeName}
        placeholder="Shape Name"
      />
      <Button title="Save" onPress={onSave} />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  savedAreasModalContainer: {
    position: 'absolute',
    bottom: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  nameModalContainer: {
    position: 'absolute',
    bottom: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  inputLabel: {fontSize: 16, marginBottom: 5},
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  listItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItemText: {
    fontSize: 16,
    color: 'gray',
  },
});
