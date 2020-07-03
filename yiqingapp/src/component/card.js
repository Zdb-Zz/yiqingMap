import React from 'react'
import axios from 'axios';

class CardItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:null,
            type:[
                'confirmedTotal',//累计确诊
                'treatingTotal',//现有确诊
                'inboundTotal',//境外输入人数
                'suspectedTotal',//疑似病例
                'asymptomaticTotal',//无症状感染者
                'deathsTotal',//死亡人数
                'curesTotal',//治愈人数
            ],
            content:'',
            confirmedTotal:0
        }
    }
    async componentWillMount(){
        let result =await axios.get('http://localhost:8080/api/newsdata')
        let data=JSON.parse(result.data.ncov_nation_data)         
        this.setState({
            data:data,            
        })         
      }
      
    render(){
            return(
                <div className='cardItem'>
                    <div className={'totalNum '+this.props.className}>{this.props.num}</div>
                    <div className='totalContent'>{this.props.content}</div>
                    <div className={'totalcompare '+this.props.className}>昨日<span>{this.props.add}</span></div>
                </div>
            )
        
    }
}

export default CardItem;