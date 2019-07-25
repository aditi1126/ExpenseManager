import React, { Component } from 'react';
import {
  ScrollView, View, Text, Button, TextInput, StyleSheet, SafeAreaView, Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: 'pink',
		height: 50,
    width: Dimensions.get('window').width - 40,
    borderRadius: 3,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    zIndex: 2,
  },
});

export default class Signup extends Component {
  state = {
    username: '',
    password: '',
    err: '',
  };

  onUsernameChange = (value) => {
    this.setState({ username: value });
  };

  onPasswordChange = (value) => {
    this.setState({ password: value });
  };

  getLength = value => value.length;

  handleBlur = () => {
    if (this.getLength(this.state.username) === 0 || this.getLength(this.state.password) === 0) this.setState({ err: 'Username and password cant be empty' });
    else if (this.getLength(this.state.password) < 8) this.setState({ err: 'Choose a strong password, at least 8 characters' });
    else this.state.err.length > 0 && this.setState({ err: '' });
  };

  isDisabled = () => {
    if (this.getLength(this.state.username) === 0 || this.getLength(this.state.password) === 0) return true;
    if (this.getLength(this.state.err) > 0) return true;
    return false;
  };


  registerUser = () => {
    fetch('/users/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    }).then((response) => { console.log('response status is', response.status); response.status === 200 ? this.props.navigation.navigate('Login') : this.setState({ err: 'User exists!' }); }).catch(err => this.setState({ err: `Could not register! Plz try again later. ${err}` }));
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
          contentContainerStyle={{
            flex: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'
          }}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text>Choose a cool username for yourself!</Text>
          <TextInput
            autoFocus
            autoCorrect={false}
            placeholder="Enter your username"
            style={styles.textInputStyle}
            textContentType="username"
            onChangeText={text => this.onUsernameChange(text)}
            value={this.state.username}
            onBlur={this.handleBlur}
          />
          <Text>And keep a secure password for login</Text>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your password"
            style={styles.textInputStyle}
            onChangeText={text => this.onPasswordChange(text)}
            value={this.state.password}
            onBlur={this.handleBlur}
            secureTextEntry
          />
          <Text style={{ textAlign: 'center', color: 'red' }}>{this.state.err}</Text>
          <Button title="Go and login with your new credentials" onPress={this.registerUser} disabled={this.isDisabled()} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
