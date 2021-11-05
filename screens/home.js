import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import context from '../context/context';
import Icon from 'react-native-vector-icons/AntDesign';

let home = React.memo(function home(props) {
  let Context = useContext(context);

  let renderPost = data => {
    return (
      <View
        style={{
          marginTop: '10%',
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'black',
          padding: '10%',
          paddingBottom: '20%',
          borderRadius: 10,
        }}>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '10%',
            width: Dimensions.get('window').width / 2,
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: Context.orientation === 'PORTRAIT' ? 20 : 25,
            }}>
            {data.item.issued_on}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: Context.orientation === 'PORTRAIT' ? 20 : 25,
            }}>
            {data.item.value}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '5%',
            width: Dimensions.get('window').width / 2.5,
          }}>
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: '500',
                fontSize: Context.orientation === 'PORTRAIT' ? 15 : 25,
              }}
              onPress={() =>
                props.navigation.navigate('Modify', {
                  data: data.item.id,
                  value: data.item.value,
                  issued_on: data.item.issued_on,
                })
              }>
              Modifier
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: '500',
                fontSize: Context.orientation === 'PORTRAIT' ? 15 : 25,
                color: 'red',
              }}
              onPress={() => Context.deleteData(data.item.id)}>
              Supprimer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: Dimensions.get('window').width / 2,
          marginTop: Context.orientation === 'PORTRAIT' ? '20%' : '5%',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Date</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Value</Text>
      </View>
      <FlatList
        data={Context.data}
        renderItem={renderPost}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate('Add')}>
        <Icon
          name="pluscircleo"
          color="green"
          size={80}
          style={{padding: Context.orientation === 'PORTRAIT' ? '5%' : '2%'}}
        />
      </TouchableOpacity>
    </View>
  );
});

home.defaultProps = {};

export default home;
