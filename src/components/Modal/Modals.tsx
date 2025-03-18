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
} from 'react-native';
import {styles} from './style';

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
  onDeleteShape,
}: any) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.savedAreasModalContainer}>
      <Text>Saved Areas</Text>

      {shapes.length === 0 ? (
        <Text style={{textAlign: 'center', marginVertical: 10}}>
          No saved areas.
        </Text>
      ) : (
        <FlatList
          data={shapes}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.listItemContainer}>
              <TouchableOpacity
                onPress={() => {
                  onSelectShape(item);
                  onClose();
                }}
                style={[
                  styles.areaItem,
                  selectedShape?.name === item.name && {
                    backgroundColor: '#DFFFD6',
                  },
                ]}>
                <Text style={styles.listItemTitle}>{item.name}</Text>
                <Text style={styles.listItemText}>Area: {item.areaSF} SF</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                onPress={() => onDeleteShape(index)} // Call delete function
                style={styles.deleteButton}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

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
