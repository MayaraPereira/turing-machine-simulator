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
        <div className="row">
          <div
            className="col s1"
            style={{ border: '1px solid #ccc', height: '40px' }}
          >
            {simbol}
          </div>
          <div
            className="col s1"
            style={{ border: '1px solid #ccc', height: '40px' }}
          >
            2
          </div>
          <div
            className="col s1"
            style={{ border: '1px solid #ccc', height: '40px' }}
          >
            3
          </div>
          <div
            className="col s1"
            style={{ border: '1px solid #ccc', height: '40px' }}
          >
            4
          </div>
          <div
            className="col s1"
            style={{ border: '1px solid #ccc', height: '40px' }}
          >
            5
          </div>
          <div
            className="col s1"
            style={{ border: '1px solid #ccc', height: '40px' }}
          >
            6
          </div>
          <div
            className="col s1"
            style={{ border: '1px solid #ccc', height: '40px' }}
          >
            7
          </div>
          <div
            className="col s1"
            style={{
              border: '1px solid #ccc',
              borderRight: '0',
              height: '40px',
            }}
          >
            8
          </div>
        </div>
      </div>
      <div id="swipe-2" className="col s12 white">
        Second tab content
      </div>
      <div id="swipe-3" className="col s12 white">
        Third tab content
      </div>
      <a
        className="waves-effect waves-light btn"
        href="#swipe-2"
        style={{ marginRight: '2%' }}
      >
        ►
      </a>
      <a className="waves-effect waves-light btn" href="#swipe-3">
        ▸▸
      </a>
    </div>
  );
}
