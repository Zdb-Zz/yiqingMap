import React from 'react';
import axios from 'axios';
import NewsCom from './component/newCom';
import './assets/css/style.css';
import HeadCom from './component/head.js'
import BodyCom from './component/body';

class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <HeadCom></HeadCom>
        <div className="body-root">
          <BodyCom></BodyCom>
        </div>
        
      </div>
    )
  }
}

export default App;
