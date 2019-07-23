import React, { Component } from 'react';
import {
  Text, View, Modal, SafeAreaView, Dimensions, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';

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

export default class AddExpenseModal extends Component {
  state = {
    showExpenseTypes: false,
    expenseTypes: [
      { name: 'Food and Drinks', icon: 'md-pizza' },
      { name: 'Monthly Groceries', icon: 'md-cart' },
      { name: 'Shopping', icon: 'md-shirt' },
      { name: 'Travel and Flights', icon: 'md-airplane' },
      { name: 'Daily Transportation', icon: 'md-bus' },
      { name: 'Movies and recreation', icon: 'logo-youtube' },
      { name: 'Going out', icon: 'md-beer' },
      { name: 'Gift for someone', icon: 'md-gift' },
      { name: 'House Rent', icon: 'md-home' },
      { name: 'Any other loss', icon: 'md-cash' },
      { name: 'Gave to a friend', icon: 'md-person' },
    ],
    description: '',
    amount: '',
    expense: '',
    friendName: '',
    friendEmail: '',
    isDateTimePickerVisible: false,
  };

  showDateTimePicker = () => {
    console.log('shown');
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (date) => {
    const dbDate = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
    console.log('dbDate', dbDate);
    this.hideDateTimePicker();
    this.setState({ date: dbDate });
  };

  saveExpense = () => {
    console.log('save callled', this.getLength(this.state.err));
    {
      this.getLength(this.state.err) === 0
      && fetch('/expenses/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.props.username,
          description: this.state.description,
          amount: this.state.amount,
          expenseType: this.state.expense,
          friendName: this.state.friendName,
          friendEmail: this.state.friendEmail,
          notificationDate: this.state.date,
        }),
      }).then((response) => {
        console.log('response status is', response);
        response.status === 200 ? this.props.closeModal() : this.setState({ err: 'Invalid input' });
      }).catch(err => this.setState({ err: `Could not add expense! Plz try again later. ${err}` }));
    }
    this.setState({ expense: '' });
  };


  selectExpenseType = (name) => {
    console.log('selected', name);
    this.setState({ expense: name, showExpenseTypes: false });
  };

  openExpenseTypes = () => {
    console.log('open');
    this.setState({ showExpenseTypes: !this.state.showExpenseTypes });
  };

  onDescriptionChange = (value) => {
    this.setState({ description: value });
  };

  onAmountChange = (value) => {
    this.setState({ amount: value });
  };

  onFriendNameChange = (value) => {
    this.setState({ friendName: value });
  };

  onFriendEmailChange = (value) => {
    this.setState({ friendEmail: value });
  };

  getLength = value => value.length;

  handleInputs = () => {
    if (this.getLength(this.state.description) === 0) this.setState({ err: 'Username cant be empty' });
    else if (this.getLength(this.state.amount) === 0) this.setState({ err: 'Amount can not be empty' });
    else if (isNaN(this.state.amount) || this.state.amount < 1) this.setState({ err: 'Amount can only be positive integers' });
    else if (this.getLength(this.state.expense) === 0) this.setState({ err: 'Please choose an expense type!' });
    else if (this.state.expense === 'Gave to a friend' && this.getLength(this.state.friendName) === 0 || this.getLength(this.state.friendEmail) === 0) this.setState({ err: 'Please fill up your friend details' });
    else {
      this.setState({ err: '' }, () => this.saveExpense());
    }
  };

  render() {
    console.log('this.state', this.state.date);
    return (
      <Modal transparent animationType="slide" position="center" onRequestClose={this.props.closeModal}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ backgroundColor: 'yellow', flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#3b5998' }}>
              <Icon.Button name="md-arrow-round-back" backgroundColor="#3b5998" size={50} color="yellow" onPress={this.props.closeModal} borderRadius={2} />
              <Icon.Button name="md-checkmark-circle" backgroundColor="#3b5998" size={50} color="yellow" onPress={this.handleInputs} borderRadius={2} />
            </View>
            <ScrollView style={{ margin: 10, flex: 1 }} keyboardShouldPersistTaps="handled">
              <TextInput
                autoFocus
                autoCorrect={false}
                placeholder="Description"
                style={styles.textInputStyle}
                onChangeText={text => this.onDescriptionChange(text)}
                value={this.state.description}
              />
              <TextInput
                autoCorrect={false}
                placeholder="Amount"
                style={styles.textInputStyle}
                onChangeText={text => this.onAmountChange(text)}
                keyboardType="numeric"
                value={this.state.amount}
              />
              { this.state.err ? <Text style={{ color: 'red' }}>{this.state.err}</Text> : <View /> }
              <TouchableOpacity style={{ width: 300, margin: 10 }}>
                <Icon.Button name="md-arrow-dropdown" backgroundColor="#3b5998" size={50} color="yellow" onPress={this.openExpenseTypes}>
                  <Text style={{ color: 'white', fontSize: 15 }}>Choose your expense type</Text>
                </Icon.Button>
              </TouchableOpacity>
              { this.state.showExpenseTypes && (
              <View style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                  {
              this.state.expenseTypes.map(expenseType => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3b5998', borderRadius: 10, margin: 10
                  }}
                  onPress={() => this.selectExpenseType(expenseType.name)}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Icon name={expenseType.icon} backgroundColor="#3b5998" size={40} color="yellow" style={{ margin: 7 }} />
                    <Text style={{ color: 'white', fontSize: 15 }}>{expenseType.name}</Text>
                  </View>
                  {	this.state.expense === expenseType.name && <Icon name="md-checkmark-circle" size={40} color="green" style={{ margin: 5 }} /> }
                </TouchableOpacity>
              ))}
                </ScrollView>
              </View>
              )
          }
              { this.state.expense === 'Gave to a friend' && this.state.showExpenseTypes === false
              && (
                <View>
                  <TextInput
                    autoFocus
                    autoCorrect={false}
                    placeholder="Friend name"
                    style={styles.textInputStyle}
                    onChangeText={text => this.onFriendNameChange(text)}
                    value={this.state.friendName}
                  />
                  <TextInput
                    autoFocus
                    autoCorrect={false}
                    placeholder="His/Her Email id"
                    style={styles.textInputStyle}
                    onChangeText={text => this.onFriendEmailChange(text)}
                    value={this.state.friendEmail}
                  />
                  <Text>Dont worry! We will notify them about this pending payment as and when you like.</Text>
                  <TouchableOpacity
                    onPress={this.showDateTimePicker}
                    style={{
                      width: 300, margin: 10, padding: 10, backgroundColor: '#3b5998', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10
                    }}
                  >
                    <Icon name="md-calendar" backgroundColor="#3b5998" size={50} color="yellow" />
                    {this.state.date
                      ? (
                        <Text style={{ color: 'white', fontSize: 15 }}>
                          {this.state.date}
                        </Text>
                      )
                      : <Text style={{ color: 'white', fontSize: 15 }}>Today</Text>
                    }
                  </TouchableOpacity>
                  {
                    this.state.isDateTimePickerVisible
                    && (
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this.handleDatePicked}
                      onCancel={this.hideDateTimePicker}
                      date={new Date()}
                      minimumDate={new Date()}
                    />
                    )
                  }
                </View>
              )
              }
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
