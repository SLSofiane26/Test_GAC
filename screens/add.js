import React, {useContext, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import context from '../context/context';

let add = React.memo(function add(props) {
  let Context = useContext(context);
  let [date, setDate] = useState(new Date());
  let [value, setValue] = useState(null);
  let [error, setError] = useState(false);

  let isValid = obj => {
    let valid = true;
    Object.values(obj).forEach(val => {
      if (!val) {
        valid = false;
      }
    });
    return valid;
  };

  let handleAdd = () => {
    let d = {};
    d.value = value;
    d.date = date;
    if (isValid(d)) {
      Context.addData(d);
      props.navigation.navigate('Home');
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 7000);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{
          marginLeft: '20%',
          marginTop: Context.orientation === 'PORTRAIT' ? '10%' : '5%',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Retour</Text>
      </TouchableOpacity>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          marginTop: Context.orientation === 'PORTRAIT' ? '30%' : '5%',
        }}>
        <Text style={{fontSize: 20}}>Date</Text>
        <DatePicker
          style={{width: '70%', marginTop: '10%'}}
          date={date}
          mode="date"
          placeholder="Selectionner une date"
          format="YYYY-MM-DD"
          minDate={new Date()}
          maxDate="2200-06-01"
          confirmBtnText="Confirmer"
          cancelBtnText="Annuler"
          onDateChange={val => setDate(val)}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
        />
        <Text style={{fontSize: 20, marginTop: '10%'}}>Value</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Value"
          placeholderTextColor={error ? 'white' : 'grey'}
          style={{
            width: '70%',
            borderWidth: 1,
            borderColor: 'black',
            height: 50,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: '10%',
            borderRadius: 10,
            marginTop: '10%',
            backgroundColor: error ? 'red' : 'white',
          }}
          value={value}
          defaultValue={value}
          onChangeText={val => {
            setValue(val);
          }}
        />
        <TouchableOpacity
          onPress={() => handleAdd()}
          style={{
            borderColor: 'black',
            borderWidth: 1,
            width: '50%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            display: 'flex',
            borderRadius: 10,
            marginTop: '15%',
            marginBottom: Context.orientation === 'PORTRAIT' ? '0%' : '10%',
          }}>
          <Text>Ajouter</Text>
        </TouchableOpacity>
        {error && !value && (
          <Text style={{fontSize: 20, marginTop: '10%', color: 'red'}}>
            Veuillez entrer une valeur
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
});

let style = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  },
});

add.defaultProps = {};

add.propTypes = {};

export default add;
