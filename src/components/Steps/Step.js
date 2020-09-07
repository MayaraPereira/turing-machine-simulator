import React from 'react';
import picture from '../../img/hqdefault.jpg';

export default function Step() {
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
      <div id="swipe-1" className="col s12 blue">
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
              <td>Alvin</td>
              <td>Eclair</td>
              <td>$0.87</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="swipe-2" className="col s12 red">
        Second tab content
        <img src={picture}></img>
      </div>
      <div id="swipe-3" className="col s12 green">
        Third tab content
      </div>
    </div>
  );
}
