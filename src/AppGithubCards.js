import React from 'react';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{ margin: 1 + 'em' }}>
      <img src={props.avatar_url} width="75" />
      <div style={{ display: 'inline-block', marginLeft: 1 + 'em' }}>
        <h2>{props.name}</h2>
        <h4>{props.company}</h4>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card key={card.id}  {...card} />)}
    </div>
  );
};

class Form extends React.Component {
  state = { userName: '' };

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.addNewCardFn(resp.data);
        this.setState({ userName: '' });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          value={this.state.userName}
          onChange={(event => this.setState({ userName: event.target.value }))}
          placeholder="Github username"
          required />
        <input type="submit" />
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: []
  };

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }))
  };

  render() {
    return (
      <div>
        <Form addNewCardFn={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default App;
