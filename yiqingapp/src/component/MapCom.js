import React from 'react';
import axios from 'axios';
import mapbanner from '../assets/images/mapbanner.png'
import '../assets/css/style.css';
import moment from 'moment';
import CardItem from './card.js'
import Map from './map.js'
import DateList from './dateList.js'
class MapCom extends React.Component{
    constructor(props){
        super(props)
        this.state={
        }
    }

    async componentWillMount(){
        let result =await axios.get('http://localhost:8080/api/newsdata')
        let data=JSON.parse(result.data.ncov_nation_data);
        let confirmedTotal = data.nationTotal.confirmedTotal;//累计确诊
        let confirmedIncrStr = data.nationwideIncr.confirmedIncrStr;//累计确诊较昨日
        let treatingTotal = data.nationTotal.treatingTotal;//现有确诊
        let treatingIncrStr = data.nationwideIncr.treatingIncrStr;//现有确诊较昨日
        let inboundTotal = data.nationTotal.inboundTotal;//境外输入人数
        let inboundIncrStr = data.nationwideIncr.inboundIncrStr;//境外输入人数较昨日
        let suspectedTotal = data.nationTotal.suspectedTotal;//疑似病例
        let suspectedIncrStr = data.nationwideIncr.suspectedIncrStr;//疑似病例较昨日
        let asymptomaticTotal = data.nationTotal.asymptomaticTotal;//无症状感染者
        let asymptomaticIncrStr = data.nationwideIncr.asymptomaticIncrStr;//无症状感染者较昨日
        let deathsTotal = data.nationTotal.deathsTotal;//死亡人数
        let deathsIncrStr = data.nationwideIncr.deathsIncrStr;//死亡人数较昨日
        let curesTotal = data.nationTotal.curesTotal;//治愈人数
        let curesIncrStr = data.nationwideIncr.curesIncrStr;//治愈人数较昨日
        let momentDate = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"); 
        this.setState({
            data:data,
            momentDate:momentDate,
            confirmedTotal:confirmedTotal,
            confirmedIncrStr:confirmedIncrStr,
            treatingTotal:treatingTotal,
            treatingIncrStr:treatingIncrStr,
            inboundTotal:inboundTotal,
            asymptomaticIncrStr:asymptomaticIncrStr,
            suspectedTotal:suspectedTotal,
            suspectedIncrStr:suspectedIncrStr,
            asymptomaticTotal:asymptomaticTotal,
            deathsTotal:deathsTotal,
            deathsIncrStr:deathsIncrStr,
            curesTotal:curesTotal,
            curesIncrStr:curesIncrStr,
            inboundIncrStr:inboundIncrStr
        })
        
      }

    render(){
       // console.log(this.state.data)

        return(
            <div className="contentItem new">
                <div className='banner'>
                    <img alt="banner" src={mapbanner}></img>
                    <h1>全国疫情<span className="momentdatestyle">更新时间{this.state.momentDate}</span></h1>
                </div>
                <div className="cards">
                {/* 'confirmedTotal',//累计确诊
                'treatingTotal',//现有确诊
                'inboundTotal',//境外输入人数
                'suspectedTotal',//疑似病例
                'asymptomaticTotal',//无症状感染者
                'deathsTotal',//死亡人数
                'curesTotal',//治愈人数 */}
                    <CardItem  className='confirmedTotal' num={this.state.confirmedTotal} content='累计确诊' add={this.state.confirmedIncrStr}></CardItem>
                    <CardItem  className='treatingTotal' num={this.state.treatingTotal} content='现有确诊' add={this.state.treatingIncrStr}></CardItem>
                    <CardItem  className='inboundTotal' num={this.state.inboundTotal} content='境外输入人数' add={this.state.asymptomaticIncrStr}></CardItem>
                    <CardItem  className='suspectedTotal' num={this.state.suspectedTotal} content='疑似病例' add={this.state.suspectedIncrStr}></CardItem>
                    <CardItem  className='asymptomaticTotal' num={this.state.asymptomaticTotal} content='无症状感染者' add={this.state.asymptomaticIncrStr}></CardItem>
                    <CardItem  className='deathsTotal' num={this.state.deathsTotal} content='死亡人数' add={this.state.deathsIncrStr}></CardItem>
                    <CardItem  className='curesTotal' num={this.state.curesTotal} content='治愈人数' add={this.state.curesIncrStr}></CardItem>
                </div>
                <span className="momentdatestyle">昨日+数据：根据国家和省市卫健委数据实时更新</span>
                <Map></Map>
                <DateList ></DateList>
            </div>
        )
    }
}

export default MapCom;