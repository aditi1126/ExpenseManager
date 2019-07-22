import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class FeedDetail extends Component {

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>FeedDetail Screen!</Text>
        <Text>{this.props.navigation.getParam('expense').description}</Text>
      </View>
    );
  }
}
