import React from 'react';

const Card = () => {
  return (
    <div style={{ margin: 1 + 'em' }}>
      <img src="http://placehold.it/75" width="75" />
      <div style={{ display: 'inline-block', marginLeft: 1 + 'em' }}>
        <h2>User name</h2>
        <h4>User work</h4>
      </div>
    </div>
  );
}

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card key={card.name}  {...card} />)}
    </div>
  );
}

export default CardList;

// export default App;
