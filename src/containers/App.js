import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  state = {
    persons: [
      { id: '1', name: 'Sumit', age: 24 },
      { id: '2', name: 'Mayank', age: 29 },
      { id: '3', name: 'Arvind', age: 26 }
    ],
    otherState: 'Some other value',
    showPersons: false
  };



  switchNameHandler = (newName) => {

    this.setState({
      persons: [
        { id: '1', name: newName, age: 24 },
        { id: '2', name: 'Mayank', age: 29 },
        { id: '3', name: 'Arvind', age: 27 }
      ]

    });
  }

  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow }); /*Entire state properties are not changed they are merged*/
  }

  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler} />;
    }

    return (

      <div className={classes.App} >
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </div>

    );
  };


}

export default App;

