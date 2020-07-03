import React from 'react';
import '../assets/css/style.css'
import axios from 'axios';

class DateList extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
       // console.log(this.state.provinces)
        if(this.state.provinces==undefined){
            return(
                <div className="contentItem new">
                    <div className='banner'>
                        <h1>疫情数据</h1>
                    </div>
                    <ul>
                        <li>
                            <span>地区</span>
                            <span>确诊</span>
                            <span>死亡</span>
                            <span>治愈</span>
                        </li>
                    </ul>
                    
                </div>
            )
        }
        else{
            return(
                <div className="contentItem new">
                    <div className='banner'>
                        <h1>疫情数据</h1>
                    </div>
                    <ul>
                        <li>
                            <span>地区</span>
                            <span>确诊</span>
                            <span>死亡</span>
                            <span>治愈</span>
                        </li>
                        {
                            this.state.provinces.map((item)=>{
                            return(
                                <li>
                                    <span>{item.name}</span>
                                    <span>{item.confirmedNum}</span>
                                    <span>{item.curesNum}</span>
                                    <span>{item.deathsNum}</span>
                                </li>
                            )
                            })
                        }
                    </ul>
                    
                </div>
            )
        }
        
    }
    async componentDidMount(){
        let result =await axios.get('http://localhost:8080/api/newsdata')
        let data=JSON.parse(result.data.ncov_nation_data);
        let provinces = data.provinces
        this.setState({
            data:data,
            provinces:provinces
        })

    }
}

export default DateList