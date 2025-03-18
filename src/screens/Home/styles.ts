// styles.ts
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
    top: 110,
    left: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});
