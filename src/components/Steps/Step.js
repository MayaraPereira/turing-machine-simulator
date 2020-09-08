import React from 'react';
//import picture from '../../img/hqdefault.jpg';
//        <img src={picture}></img>

export default function Step() {
  const simbol = '▷';
  return (
    <div>
      <ul id="tabs-swipe-demo" className="tabs">
        <li className="tab col s3">
          <a href="#swipe-1">Test 1</a>
        </li>
        <li className="tab col s3">
          <a className="active" href="#swipe-2">
            Test 2
          </a>
        </li>
        <li className="tab col s3">
          <a href="#swipe-3">Test 3</a>
        </li>
      </ul>
      <div id="swipe-1" className="col s12 white">
        First tab content
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{simbol}</td>
              <td>Eclair</td>
              <td>$0.87</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="swipe-2" className="col s12 white">
        Second tab content
      </div>
      <div id="swipe-3" className="col s12 white">
        Third tab content
      </div>
      <a className="waves-effect waves-light btn" href="#swipe-2">
        Next
      </a>
    </div>
  );
}
