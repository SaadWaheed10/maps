import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  areaItem: {
    flex: 1,
    padding: 10,
  },
});
