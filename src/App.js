import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import fn from './utils/functions'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      carById: {},
      carsByColor: [],
      colors: ['Select color','Orange', 'Blue', 'Green', 'Purple', 'Yellow'],
      checked: true,
      randomNum: null,
    }
    this.filterCarsById = this.filterCarsById.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.filterByColor = this.filterByColor.bind(this); 
    this.randomNum = this.randomNum.bind(this); 
  }

  componentDidMount() {
    fn.getCars('/api/cars').then( data => {
      this.setState({
        cars: data
      })
    })
  }

  filterCarsById() {
    const car = fn.getCars( this.input.value, this.state.cars )
    this.setState({
      carById: car
    })
  }

  filterByColor(e) {
    const cars = this.state.cars.filter( car => {
      return car.color === e.target.value
    })
    this.setState({
      carsByColor: cars
    })
  }

  randomNum() {
    this.setState({
      randomNum: fn.getRandomNumber()
    })
  }
  
  toggleCheck() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    const options = this.state.colors.map( (color) => {
      return <option key={color} value={color}>{color}</option>
    })
    return (
      <div className="App">
        <h1>Car Inventory</h1>
        <h3>Car Data:</h3>
        <p>Show/hide 
          <input 
            onChange={this.toggleCheck} 
            checked={this.state.checked} 
            type='checkbox'
          />
        </p>
        {this.state.checked ? 
          JSON.stringify(this.state.cars, null, 2) : 'Car data hidden.'}
        <hr/>  
        <h3>Filter cars by ID</h3>
        <input 
          ref={(input)=> this.input = input}
          placeholder='Enter a number 1 - 25'
          onChange={({target}) => this.setState({inputValue: target.value})} 
        />
        <button onClick={this.filterCarsById}>Get car</button><br/><br/>
        {this.state.carById.length === 0 ?
           'No car selected.'
           :
           JSON.stringify(this.state.carById, null, 2)}
        <hr/>

        <h3>Filter cars by color:</h3>
        <select onChange={this.filterByColor}>
          { options }
        </select><br/><br/> 
        {this.state.carsByColor.length === 0 ?
          'No cars to show.'
          :
          JSON.stringify(this.state.carsByColor, null, 2)}
        <hr />
        <h1>Random number generator</h1>
        <button onClick={this.randomNum}>1 - 10</button>
        <p>Random number: {this.state.randomNum}</p>
      </div>
    );
  }
}

export default App;
