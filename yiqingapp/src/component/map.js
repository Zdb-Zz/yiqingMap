import React from 'react';
import './map.css';
import axios from 'axios'

class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render(){
        
        return(
            <div>
                <div className="contentItem new">
                    <div className='banner'>
                        <h1>疫情地图</h1>
                    </div>
                </div>
                <div id='main'></div>
            </div>
        )
    }
   async componentDidMount(){
        let result = await axios.get('http://localhost:8080/api/newsdata')
        let data=JSON.parse(result.data.ncov_nation_data);
        let provincesData=data.provinces
        this.setState({
            data:data,
            provincesData:provincesData
        })
        var dataList=[
          {name:"南海诸岛",value:0},
          {name: '北京', value: randomValue()},
          {name: '天津', value: randomValue()},
          {name: '上海', value: randomValue()},
          {name: '重庆', value: randomValue()},
          {name: '河北', value: randomValue()},
          {name: '河南', value: randomValue()},
          {name: '云南', value: randomValue()},
          {name: '辽宁', value: randomValue()},
          {name: '黑龙江', value: randomValue()},
          {name: '湖南', value: randomValue()},
          {name: '安徽', value: randomValue()},
          {name: '山东', value: randomValue()},
          {name: '新疆', value: randomValue()},
          {name: '江苏', value: randomValue()},
          {name: '浙江', value: randomValue()},
          {name: '江西', value: randomValue()},
          {name: '湖北', value: randomValue()},
          {name: '广西', value: randomValue()},
          {name: '甘肃', value: randomValue()},
          {name: '山西', value: randomValue()},
          {name: '内蒙古', value: randomValue()},
          {name: '陕西', value: randomValue()},
          {name: '吉林', value: randomValue()},
          {name: '福建', value: randomValue()},
          {name: '贵州', value: randomValue()},
          {name: '广东', value: randomValue()},
          {name: '青海', value: randomValue()},
          {name: '西藏', value: randomValue()},
          {name: '四川', value: randomValue()},
          {name: '宁夏', value: randomValue()},
          {name: '海南', value: randomValue()},
          {name: '台湾', value: randomValue()},
          {name: '香港', value: randomValue()},
          {name: '澳门', value: randomValue()}
      ]
      let obj={}
      console.log(this.state.provincesData)
      this.state.provincesData.forEach((item,i) => {
        if(obj[item.name]===undefined){
          obj[item.name]={
            confirm:0,
            curesNum:0,
            asymptomaticNum:0
           }
        }
        obj[item.name]={
          confirm:item.confirmedNum,     
          curesNum:item.curesNum,
          asymptomaticNum:item.asymptomaticNum 
        }
      });
      //console.log(obj)
        dataList.map((item,index)=>{
            if(obj[item.name]){
              item.value=obj[item.name].confirm;
              item.asymptomaticNum=obj[item.name].asymptomaticNum;
            }else{
              item.value=0
            }
         })
         
      var myChart = window.echarts.init(document.getElementById('main'));
      function randomValue() {
          return Math.round(Math.random()*1000);
      }
      let option = {
          tooltip: {
                  formatter:function(params,ticket, callback){
                      return params.seriesName+'<br />'+params.name+'：'+params.value
                  }//数据格式化
              },
          visualMap: {
              min: 0,
              max: 1500,
              left: 'left',
              top: 'bottom',
              text: ['高','低'],//取值范围的文字
              inRange: {
                  color: ['yellow', 'red']//取值范围的颜色
              },
              show:true//图注
          },
          geo: {
              map: 'china',
              roam: false,//不开启缩放和平移
              zoom:1.23,//视角缩放比例
              label: {
                  normal: {
                      show: true,
                      fontSize:'10',
                      color: 'rgba(0,0,0,0.7)'
                  }
              },
              itemStyle: {
                  normal:{
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                  },
                  emphasis:{
                      areaColor: '#F3B329',//鼠标选择区域颜色
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 20,
                      borderWidth: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          },
          series : [
              {
                  name: '确诊人数',
                  type: 'map',
                  geoIndex: 0,
                  data:dataList
              }
          ]
      };
        myChart.setOption(option);
      }
}

export default Map