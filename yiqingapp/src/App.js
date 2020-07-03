import React from 'react';
import NewsCom from './component/newCom';
import MapCom from './component/MapCom';
import './assets/css/style.css';

function HzCom(props){
  return(
    <div className="contentItem">
      <h1>这是杭州疫情组件</h1>
    </div>
  )
}
function HwCom(props){
  return(
    <div className="contentItem">
      <h1>这是海外疫情组件</h1>
    </div>
  )
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      newData:null,
      navList:['疫情地图','最新进展','杭州疫情','海外疫情'],
      tabIndex:0,
      barStyle:{
        left:'22px'
      },
      contentStyle:{
        transform:'translate(0,0)'
      },
      x:0,
      y:0,
    }
    this.scrollLeft=0
    this.handleTouchMove=this.handleTouchMove.bind(this)
    this.handleStart=this.handleStart.bind(this)
    this.handleEnd=this.handleEnd.bind(this)
  }
  
  tabClickEvent=(index)=>{
    //console.log(index)
    this.setState({
      tabIndex:index,
      barStyle:{
        left:(index*88+22)+'px'
      },
      contentStyle:{
        transform:`translate(-${index*375}px,0)`
      }
    })
  }
  handleStart = (e) => {
    e.preventDefault();     
    this.setState({  
        startX : e.targetTouches[0].clientX,
        startY : e.targetTouches[0].clientY,
    });
}
  handleTouchMove = (e) => {
    const { startX, startY} = this.state;//取得初始坐标和屏幕可视宽高        
    this.setState({
        ///都可以来设置实时变化的值，不用用到changedTouches；
        x: e.touches[0].clientX - startX, //当前触摸点-初始坐标取得实时变化值
        y: e.touches[0].clientY - startY,
    });
    //  console.log('x='+this.state.x)
    //  console.log('y='+this.state.y)
}

    handleEnd=(e)=>{
      let flag = this.state.tabIndex;
      if(this.state.x>=100 && flag>0){//左
        flag-=1;        
      }
      if(this.state.x<=-100 && flag<3){//右
        flag+=1;        
      }
      this.setState({
        tabIndex:flag,
        barStyle:{
          left:(flag*88+22)+'px'
        },
        contentStyle:{
          transform:`translate(-${flag*375}px,0)`
        }
      })
    }

  render(){
    return (
        <div className="App">
          <div className="nav">
            {
              this.state.navList.map((item,index)=>{
                if(index===this.state.tabIndex){
                  return(
                    <div key={index} onClick={(event)=>{this.tabClickEvent(index)}} className="navItem active">{item}</div>
                  )
                }
                return(
                  <div key={index} onClick={(event)=>{this.tabClickEvent(index)}} className="navItem">{item}</div>
                )
              })
            }
            <div className="bar" style={this.state.barStyle}></div>
          </div>
          <div className="body-root">
            <div className="content" 
              style={this.state.contentStyle}
              onTouchStart={this.handleStart} 
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleEnd}
              >
              <MapCom></MapCom>
              <NewsCom></NewsCom>
              <HzCom></HzCom>
              <HwCom></HwCom>
            </div>
          </div>
         
          
        </div>
    );
  }
 
}

export default App;
