/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapView, {LatLng, Polygon} from 'react-native-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {area} from '@turf/turf';
import {polygon} from '@turf/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MenuModal, NameModal, SavedAreasModal} from '../components/Modals';

export default function HomeScreen({savedShapes}: {savedShapes: any}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [savedAreasModalVisible, setSavedAreasModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLng[]>([]);
  const [shapes, setShapes] = useState(savedShapes || []);
  const [shapeName, setShapeName] = useState('');
  const [selectedShape, setSelectedShape] = useState<{
    name: string;
    coordinates: LatLng[];
  } | null>(null);

  useEffect(() => {
    if (savedShapes) {
      setShapes(savedShapes);
    }
  }, [savedShapes]);

  const handlePanDrag = (event: any) => {
    if (drawing) {
      const {coordinate} = event.nativeEvent;
      setPolygonCoordinates(prev => [...prev, coordinate]);
    }
  };

  const handleFinishDrawing = () => {
    if (polygonCoordinates.length > 2) {
      setNameModalVisible(true);
    } else {
      setDrawing(false);
    }
  };

  const calculateArea = (coordinates: LatLng[]): number => {
    if (coordinates.length < 3) {
      return 0;
    }
    const closedCoordinates = [...coordinates, coordinates[0]];
    const polygo = polygon([
      closedCoordinates.map(coord => [coord.longitude, coord.latitude]),
    ]);
    return parseFloat((area(polygo) * 10.764).toFixed(2));
  };

  const handleSaveShape = async () => {
    if (shapeName.trim() !== '') {
      const areaSF = calculateArea(polygonCoordinates);
      const newShapes = [
        ...shapes,
        {name: shapeName, areaSF, coordinates: polygonCoordinates},
      ];
      setShapes(newShapes);
      setPolygonCoordinates([]);
      setShapeName('');
      setNameModalVisible(false);
      setDrawing(false);
      try {
        await AsyncStorage.setItem('savedShapes', JSON.stringify(newShapes));
      } catch (error) {
        console.error('Error saving shapes:', error);
      }
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={!drawing}
          zoomEnabled={!drawing}
          onPanDrag={handlePanDrag}
          onPress={handlePanDrag}>
          {/* Display drawn polygon while drawing */}
          {drawing && polygonCoordinates.length > 1 && (
            <Polygon
              coordinates={polygonCoordinates}
              strokeWidth={2}
              strokeColor="blue"
              fillColor="rgba(0, 0, 255, 0.3)"
            />
          )}

          {/* Display selected shape */}
          {selectedShape && (
            <View style={styles.selectedAreaContainer}>
              <Text style={styles.selectedAreaName}>{selectedShape.name}</Text>
              <Polygon
                coordinates={selectedShape.coordinates}
                strokeWidth={2}
                strokeColor="green"
                fillColor="rgba(0,255,0,0.3)"
              />
            </View>
          )}
        </MapView>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.iconButton}>
          <Text style={{fontSize: 40, color: 'red'}}>≡</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSavedAreasModalVisible(true)}
          style={styles.savedAreasButton}>
          <Text style={styles.buttonText}>Saved Areas</Text>
        </TouchableOpacity>

        {drawing && polygonCoordinates.length > 2 && (
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishDrawing}>
            <Text style={{color: 'white'}}>Finish</Text>
          </TouchableOpacity>
        )}

        <MenuModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onStartDrawing={() => {
            setDrawing(true);
            setModalVisible(false);
          }}
        />
        <SavedAreasModal
          visible={savedAreasModalVisible}
          onClose={() => setSavedAreasModalVisible(false)}
          shapes={shapes}
          selectedShape={selectedShape}
          onSelectShape={setSelectedShape}
        />
        <NameModal
          visible={nameModalVisible}
          shapeName={shapeName}
          setShapeName={setShapeName}
          onSave={handleSaveShape}
        />
      </View>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
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
  listItem: {fontSize: 18, paddingVertical: 5},
  finishButton: {
    position: 'absolute',
    bottom: 50,
    left: '40%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  savedAreasButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {color: 'white', fontSize: 16},
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
  selectedAreaContainer: {
    position: 'relative',
    top: 400,
    left: 200,
    padding: 5,
    borderRadius: 5,
    elevation: 3,
  },
  selectedAreaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  resetButton: {
    position: 'absolute',
    top: 110, // Adjust positioning as needed
    left: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
