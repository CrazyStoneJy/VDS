import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import Sudoku from './ui/Sudoku';
import BST from './ui/bst';
import NQueen from './ui/nqueen';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: '/sudoku',
    element: <Sudoku/>
  },
  {
    path: '/bst',
    element: <BST/>
  },
  {
    path: '/nqueen',
    element: <NQueen/>
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
