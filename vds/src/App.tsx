import React from 'react';
import Header from './component/header';
import List from './component/list';
import './App.css';

function App() {

  return (
    <div className="App">
      <Header />
      <div className="app_list_margin">
        <List/>
      </div>
    </div>
  );
}


export default App;
