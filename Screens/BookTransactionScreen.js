import React from 'react';
import * as Permissions from 'expo-permission';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Image} from 'react-native';

export default class TransactionScreen extends React.Component{

  constructor(){
    super()
    this.state = {
      hasCameraPermissions:null,
      scanned:false,
      scannedBookId:'',
      scannedStudentId:'',
      buttonState:'normal',
    }
  }
  getCameraPermissions = async(id)=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions:status === "granted",
      buttonState:id,
      scanned:false
    })
  }

  handleBarCodeScanned = async ({type,data}) =>{

    const{buttonState} = this.state;
    if (buttonState === "BookId") {
      this.setState ({
        scanned:true,
        scannedBookId:data,
        buttonState:'normal'
      })
    }
    else if (buttonState === "StudentId") {
      this.setState ({
        scanned:true,
        scannedStudentId:data,
        buttonState:'normal'
      })
    }

  }
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== "normal" && hasCameraPermissions){
      return (
        <BarCodeScanner
          onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
          style = {StyleSheet.absoluteFillObject}
        />
      );
    }
    else if (buttonState === "normal"){
      return(
        <View sttyle = {styles.container}>
          <View>
            <Image
              source={require("../assets/booklogo.jpg")}
              style = {{width:200, height:200,}}
            />
            <Text style = {{textAlign:'center', fontSize:30}}>Wily</Text>
          </View>
          <View style = {styles.inputView}>
            <TextInput
              style = {styles.imputBox}
              placeholder = "Book Id"
              value = {this.state.scannedBookId}
            />
           <TouchableOpacity
            onPress = {()=>{this.getCameraPermissions ("BookId")}}
            style = {styles.scanButton}
          >
            <Text style = {styles.buttonText}>Scan</Text>
          </TouchableOpacity>
          </View>

          <View style = {styles.inputView}>
            <TextInput
              style = {styles.imputBox}
              placeholder = "Student Id"
              value = {this.state.scannedStudentId}
            />
           <TouchableOpacity
            onPress = {()=>{this.getCameraPermissions ("StudentId")}}
            style = {styles.scanButton}
          >
            <Text style = {styles.buttonText}>Scan</Text>
          </TouchableOpacity>
          </View>
        </View>

      );
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  displayText:{
    fontSize:15,
    textDecorationLine:'underline',
  },
  scanButton:{
    backgroundColor:'black',
    padding:10,
    margin:10,
  },
  buttonText:{
    fontSize:20,
    color:'lime',
  },
  inputView:{
    flexDirection:'row',
    margin:20.
  },
  inputBox:{
    width:200,
    height:40,
    borderWidth:1.5,
    borderRightWidth:0,
    fontSize:20,
  },
  scanButton:{
    backgroundColor:'gray',
    width:50,
    borderWidth:1.5,
    borderLeftWidth:0,
  }
})