import React, { Component } from 'react';
import {
  ScrollView, Text, Button, SafeAreaView, Dimensions, StyleSheet, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

export default class Login extends Component {
  state = {
    users: [],
    username: '',
    password: '',
    err: '',
  };


  validateUser = () => {
    fetch('/users/')
      .then(res => res.json())
      .then((users) => {
        const match = users.filter(user => user.username === this.state.username && user.password === this.state.password);
        if (match.length === 1) {
          // to be implemented later for whole Dashboard Stack.........

          // this.props.navigation.navigate('Dashboard', {}, {
          //   type: 'Navigate',
          //   routeName: 'Feed',
          //   params: {
          //     username: match[0].username,
          //   }
          // });
          console.log('match found');
          console.log(match[0].username);
          this.props.navigation.navigate('Feed', {
            username: match[0].username
          });
        } else {
          console.log('else');
          this.setState({ err: 'No such user exists' });
        }
      }).catch(err => this.setState({ err: `Could not login! Plz try again later. ${err}` }));
  };

  onUsernameChange = (value) => {
    this.setState({ username: value });
  };

  onPasswordChange = (value) => {
    this.setState({ password: value });
  };

  getLength = value => value.length;

  handleBlur = () => {
    console.log('handle blur');
    if (this.getLength(this.state.username) === 0 || this.getLength(this.state.password) === 0) this.setState({ err: 'Username and password cant be empty' });
    else this.state.err.length > 0 && this.setState({ err: '' });
  };

  render() {
    console.log('err and length', this.state.err, this.state.err.length);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView
          contentContainerStyle={{
            flex: 6, justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow'
          }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
        >
          <Text>Login Screen!</Text>
          <Text>Enter your username</Text>
          <TextInput
            autoFocus
            autoCorrect={false}
            placeholder="Enter your username"
            style={styles.textInputStyle}
            textContentType="username"
            onChangeText={text => this.onUsernameChange(text)}
            onBlur={this.handleBlur}
            value={this.state.username}
          />
          <Text>Enter your password</Text>
          <TextInput
            autoCorrect={false}
            placeholder="Enter your password"
            style={styles.textInputStyle}
            onChangeText={text => this.onPasswordChange(text)}
            onBlur={this.handleBlur}
            value={this.state.password}
            secureTextEntry
          />
          {this.state.err ? <Text style={{ color: 'red', textAlign: 'center', marginVertical: 5 }}>{this.state.err}</Text> : null}
          <Text style={{ margin: 5 }}>----------OR----------</Text>
          <Icon.Button name="google" backgroundColor="#c24a3a">
            <Text style={{
              fontFamily: 'Arial', fontSize: 15, color: 'white', margin: 2
            }}
            >
              Login with Google
            </Text>
          </Icon.Button>
          <Text style={{ margin: 5 }}>----------OR-----------</Text>
          <Icon.Button name="facebook" backgroundColor="#4A90E2">
            <Text style={{
              fontFamily: 'Arial', fontSize: 15, color: 'white', margin: 2
            }}
            >
              Login with Facebook
            </Text>
          </Icon.Button>
          <Button title="Go to dashboard" onPress={this.validateUser} disabled={this.getLength(this.state.err) > 0} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
