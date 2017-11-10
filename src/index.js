import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import App from './AppGithubCards';


let data = [
  { name: "Oliver Sosa", avatar_url: "http://placehold.it/75", company: "Ascentis" },
  { name: "Stephanie", avatar_url: "http://placehold.it/75", company: "Ascentis" },
  { name: "Juan Pablo Leites", avatar_url: "http://placehold.it/75", company: "Ascentis" },
];

ReactDOM.render(<App cards={data} />, document.getElementById('root'));
