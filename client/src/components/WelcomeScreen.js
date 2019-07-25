import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' }}>
        <Text>Welcome Screen!</Text>
        <Button title="Login" onPress={() => this.props.navigation.navigate('Login')} />
        <Button title="Sign up" onPress={() => this.props.navigation.navigate('Signup')} />
      </View>
    );
  }
}
