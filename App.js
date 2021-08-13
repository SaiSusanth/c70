import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'

import TransactionScreen from './Screens/BookTransactionScreen';
import SearchScreen from './Screens/SearchScreen';

export default class App extends React.Component {

  render (){
    return (
      <AppContainer/>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction:{screen:TransactionScreen},
  Search:{screen:SearchScreen},
},
  {
    defaultNavigationOptions:({navigation}) =>({
      tabBarIcon:() =>{
        const routeName = navigation.state.routeName;
        console.log(routeName);
        if (routeName==="Transaction") {
          return(
            <Image
              source={require("./assest/searchingbook.png")}
              style = {{width:40, height:40}}
            />
          );
        }
      }
    })
  }
)

const AppContainer = createAppContainer(TabNavigator);
