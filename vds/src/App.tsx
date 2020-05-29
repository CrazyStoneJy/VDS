import React from 'react';
import logo from './logo.svg';
import './App.css';
import BinaryTree from './alogrithm/tree/binary/binary_tree';

function App() {

  createTree();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          EQdit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


function createTree() {
  let binaryTree = new BinaryTree();
  binaryTree.insert(15);
  binaryTree.insert(6);
  binaryTree.insert(3);
  // binaryTree.insert(7);
  // binaryTree.insert(2);
  // binaryTree.insert(4);
  // binaryTree.insert(13);
  // binaryTree.insert(9);
  // binaryTree.insert(18);
  // binaryTree.insert(17);
  // binaryTree.insert(20);
  
  binaryTree.show(binaryTree.root);

}

export default App;
