import {useRoute} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import context from '../context/context';

let modify = React.memo(function modify(props) {
  let Context = useContext(context);

  let [date, setDate] = useState(null);

  let [valu, setValue] = useState('');

  let [error, setError] = useState(false);

  let route = useRoute();

  let {data, value, issued_on} = route.params;

  useEffect(() => {
    setDate(issued_on);
    setValue(value);
  }, []);

  let isValid = obj => {
    let valid = true;
    Object.values(obj).forEach(val => {
      if (!val) {
        valid = false;
      }
    });
    return valid;
  };

  let handlemodify = () => {
    let d = {};
    d.value = valu;
    d.issued_on = date;
    d.id = data;

    if (isValid(d)) {
      Context.modifyData(d);
      props.navigation.navigate('Home');
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 7000);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
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
          defaultValue={valu}
          value={valu}
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
          onChangeText={val => {
            setValue(val);
          }}
        />
        <TouchableOpacity
          onPress={() => handlemodify()}
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

modify.defaultProps = {};

modify.propTypes = {};

export default modify;
