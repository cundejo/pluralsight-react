import React from 'react';
import _ from 'lodash';
import './styles.css';

const Stars = (props) => {

  // const numberOfStars = 1 + Math.floor(Math.random() * 9);

  return (
    <div className="col-md-5">
      {_.range(props.numberOfStars).map(i =>
        <i key={i} className="fa fa-star"/>
      )}
    </div>
  );
};

const Button = (props) => {

  let button;

  switch (props.answerIsCorrect) {
    case true:
      button = <button className="btn btn-lg btn-success"
                       onClick={props.acceptAnswer}>
        <i className="fa fa-check"/>
      </button>;
      break;
    case false:
      button = <button className="btn btn-lg btn-danger">
        <i className="fa fa-times"/>
      </button>;
      break;
    default:
      button = <button className="btn btn-lg"
                       disabled={props.selectedNumbers.length === 0}
                       onClick={props.checkAnswer}>
        =
      </button>;
      break;
  }

  return (
    <div className="col-md-2">
      {button}
    </div>
  );
};

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.clickedNumber = this.clickedNumber.bind(this);
  }

  clickedNumber(event) {
    this.props.unselectNumber(+event.target.dataset.number);
  }

  render() {
    return (
      <div className="col-md-5">
        {this.props.selectedNumbers.map(number =>
          <span key={number}
                onClick={this.clickedNumber}
                data-number={number}>
            {number}
          </span>
        )}
      </div>
    );
  }
}

class Numbers extends React.Component {
  constructor(props) {
    super(props);
    this.clickedNumber = this.clickedNumber.bind(this);
  }

  numberClass(number) {
    if (this.props.usedNumbers.includes(number)) {
      return "used";
    }
    if (this.props.selectedNumbers.includes(number)) {
      return "selected";
    }
  };

  clickedNumber(event) {
    this.props.selectNumber(+event.target.dataset.number);
  }

  render() {
    const list = _.range(1, 10);
    return (
      <div className="well text-center">
        <div>
          {list.map((number) =>
            <span key={number}
                  data-number={number}
                  className={this.numberClass(number)}
                  onClick={this.clickedNumber}>
              {number}
            </span>
          )}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNumbers: [],    // The actual numbers shosen
      numberOfStars: 1 + Math.floor(Math.random() * 9),
      answerIsCorrect: null,
      usedNumbers: [],        // The numbers already used in the game.
    };
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
  }

  selectNumber(clickedNumber) {
    console.log("Selected number ", clickedNumber);
    if (this.state.selectedNumbers.includes(clickedNumber)) {
      return;
    }

    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  }

  unselectNumber(clickedNumber) {
    this.setState(prevState => ({
      answerIsCorrect: null,
      // The filter() method creates a new array with all elements
      // that pass the test implemented by the provided function.
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  }

  checkAnswer() {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars ===
      prevState.selectedNumbers.reduce((accumulator, current) => accumulator + current, 0)
    }));
  }

  acceptAnswer() {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: 1 + Math.floor(Math.random() * 9)
    }));
  }

  render() {
    console.log("Actual state ", this.state.selectedNumbers);

    // Destructure out of the state, it is for more cleaned code.
    const {numberOfStars, selectedNumbers, answerIsCorrect, usedNumbers} = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr/>
        <div className="row">

          <Stars numberOfStars={numberOfStars}/>

          <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}/>

          <Answer selectedNumbers={selectedNumbers}
                  unselectNumber={this.unselectNumber}/>

        </div>

        <br/>

        <Numbers selectedNumbers={selectedNumbers}
                 selectNumber={this.selectNumber}
                 usedNumbers={usedNumbers}/>
      </div>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <div>
        <Game/>
      </div>
    );
  }
}

export default App;
