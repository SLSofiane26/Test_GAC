import React, {PureComponent} from 'react';
import context from '../context/context';
import data from '../data/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigation from '../navigation/homeNavigation';
import {Dimensions} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';

let isPortrait = () => {
  let {width, height} = Dimensions.get('window');
  return height > width;
};

class Application extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          issued_on: '2018-01-01',
          value: '1200',
        },
        {
          id: 2,
          issued_on: '2018-01-10',
          value: '1350',
        },
        {
          id: 3,
          issued_on: '2018-01-25',
          value: '1642',
        },
        {
          id: 4,
          issued_on: '2018-03-10',
          value: '2051',
        },
      ],
      addData: data => this.addData(data),
      deleteData: data => this.deleteData(data),
      modifyData: data => this.modifyData(data),
      orientation: null,
    };
    this.addData = this.addData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.modifyData = this.modifyData.bind(this);
  }

  addData = async data => {
    let d = {};

    let c = this.state.data[this.state.data.length - 1].id;

    d.issued_on = new Date(data.date).toISOString().slice(0, 10);
    d.value = data.value;
    d.id = c + 1;

    let g = this.state.data.slice();

    g.push(d);

    this.setState(prevState => ({
      ...this.state,
      data: g,
    }));

    await AsyncStorage.setItem('data', JSON.stringify(g));
  };

  deleteData = async data => {
    let f = this.state.data.findIndex(x => x.id === data);
    let g = this.state.data.slice();
    g.splice(f, 1);

    this.setState(prevState => ({
      ...this.state,
      data: g,
    }));
    await AsyncStorage.setItem('data', JSON.stringify(g));
  };

  modifyData = async data => {
    let c = this.state.data.findIndex(x => x.id === data.id);
    let d = this.state.data.slice();
    d[c].issued_on = data.issued_on;
    d[c].value = data.value;

    this.setState(prevState => ({
      ...this.state,
      data: d,
    }));

    await AsyncStorage.setItem('data', JSON.stringify(d));
  };

  componentDidMount = async () => {
    if (Dimensions.get('window').height > Dimensions.get('window').width) {
      this.setState(prevState => ({
        ...this.state,
        orientation: 'PORTRAIT',
      }));
    } else {
      this.setState(prevState => ({
        ...this.state,
        orientation: 'LANDSCAPE',
      }));
    }
    Dimensions.addEventListener('change', () => {
      if (isPortrait()) {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'PORTRAIT',
        }));
      } else {
        this.setState(prevState => ({
          ...this.state,
          orientation: 'LANDSCAPE',
        }));
      }
    });

    let c = await AsyncStorage.getItem('data');
    let d = JSON.parse(c);

    if (d.length > 0) {
      this.setState(prevState => ({
        ...this.state,
        data: JSON.parse(c),
      }));
    } else {
      return;
    }
  };

  componentDidUpdate = (prevProps, prevState) => {};

  componentWillUnmount = () => {};

  render() {
    return (
      <context.Provider value={this.state}>
        <NavigationContainer>
          <HomeNavigation />
        </NavigationContainer>
      </context.Provider>
    );
  }
}

export default Application;
