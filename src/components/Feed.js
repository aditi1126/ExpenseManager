import React, { Component } from 'react';
import {
  Text, Button, ScrollView, View, SafeAreaView, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddExpenseModal from './AddExpenseModal';

export default class Feed extends Component {
  state = {
    expenses: [],
  };

  componentDidMount() {
    console.log('navig params', this.props.navigation);
    const username = this.props.navigation.getParam('username');
    console.log('comp did mount', username);
    this.setState({ username });
    fetch('/expenses/')
      .then(res => res.json())
      .then((expenses) => {
        this.setState({ expenses });
      });
  }

  openAddExpenseModel = () => this.setState({ isAddExpenseModelOpen: true });

  closeModal = () => {
    this.setState({ isAddExpenseModelOpen: false });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1, padding: 10, backgroundColor: 'yellow' }}>
          <Text>
          Welcome
            {' '}
            {this.state.username}
!
          </Text>
          <Text>Feed Screen!</Text>
          <Text>Your expenses so far</Text>
          {
              this.state.expenses.map(expense => (
                <View style={{ backgroundColor: 'white', margin: 5 }}>
                  <Text>{expense.description}</Text>
                  <Button
                    title="Go to expense details"
                    onPress={() => this.props.navigation.navigate('FeedDetail', { expense })}
                  />
                </View>
              ))
            }
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Icon.Button name="plus" backgroundColor="#3b5998" size={50} color="yellow" onPress={this.openAddExpenseModel} borderRadius={2} />
          </View>
          {
            this.state.isAddExpenseModelOpen
            && <AddExpenseModal closeModal={this.closeModal} username={this.state.username} navigation={this.props.navigation} />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}
