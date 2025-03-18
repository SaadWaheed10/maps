/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import MapView, {LatLng, Polygon} from 'react-native-maps';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {area} from '@turf/turf';
import {polygon} from '@turf/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MenuModal,
  NameModal,
  SavedAreasModal,
} from '../../components/Modal/Modals';
import {styles} from './styles';

interface Shape {
  name: string;
  areaSF: number;
  coordinates: LatLng[];
}

export default function HomeScreen({savedShapes = []}: {savedShapes?: any}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [savedAreasModalVisible, setSavedAreasModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState<LatLng[]>([]);
  const [shapes, setShapes] = useState<Shape[]>(savedShapes || []);
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

  const handleDeleteShape = async (index: number) => {
    try {
      const updatedShapes = shapes.filter((_: any, i: number) => i !== index);
      console.log('Updated Shapes:', updatedShapes);
      setShapes(updatedShapes);

      await AsyncStorage.setItem('savedShapes', JSON.stringify(updatedShapes));
    } catch (error) {
      console.error('Error deleting shape:', error);
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
          onDeleteShape={handleDeleteShape}
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
