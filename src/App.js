import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
background-color: ${props => props.alt ? 'red' : 'green'};
   font: inherit;
   border: 1px solid blue;
   padding: 8px;
   color: white;
   cursor: pointer;

   &:hover {
     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
     color: black;
   }
`;

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
    //console.log('Was clicked!');
    //Don't do this => personsState.persons[0].name = 'Max';
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

    //const person = Object.assign({}, this.state.persons[personIndex]);

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

    // const style = {
    //   backgroundColor: 'green',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   color: 'white',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangeHandler(event, person.id)}
              />
            })
          }

        </div>
      );

      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); //classes = ['red']
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold'); //classes = ['red', 'blue']
    }

    return (

      <div className="App" >
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <StyledButton alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton>
        {persons}
      </div >

    );
  };

  //The above code is transpiled to

  //return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hi, I\'m a React app'));

}

//Higher Order Component
export default App;

