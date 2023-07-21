import React from 'react';
import {
  Link
} from "react-router-dom";
import './list.css';

function List() {
    const array: Array<any> = [{name: '数独',routeName: 'sudoku' }, {name: '二叉树', routeName: 'bst'}, {name: 'N皇后问题', routeName: 'nqueen'}];
    return (
        <ul>
          {
            array.map((value: any, index: number) => {
              return (
                <li className='list_li_style'>
                  <Link to={value.routeName}>{value.name}</Link>
                </li>
              );
            })
          }
        </ul>
    );
}

export default List;