import React from 'react';
import axios from 'axios';
import '../assets/css/style.css';
import bannerImg from '../assets/images/banner.jpg'

class NewsCom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            dataList:[]
        }
    }

    async componentWillMount(){
        let newsresult =await axios.get('http://localhost:8080/api/news')
        let news=JSON.parse(newsresult.data.data[0].content)
       // console.log(news.sub_raw_datas)
        this.setState({
            dataList:news.sub_raw_datas
        })
    }

    render(){
        return(
            <div className="contentItem new">
                <div className='banner'>
                    <img alt="banner" src={bannerImg}></img>
                    <h1>疫情追踪</h1>
                </div>
                <div className='newContent'>
                    <div className="line"></div>
                    <div className="newList">
                        {
                            this.state.dataList.map((item,index)=>{
                                if(item.raw_data.event_image){
                                    return(
                                        <div key={index} className="newsListItem">
                                            <div className="time">{item.raw_data.showtime_string}</div>
                                            <div className="desc">
                                                {item.raw_data.desc}    
                                            </div>    
                                            <div className="img">
                                                <img src={item.raw_data.event_image.url} alt="img"></img>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div key={index} className="newsListItem">
                                            <div className="time">{item.raw_data.showtime_string}</div>
                                            <div className="desc">
                                                {item.raw_data.desc}    
                                            </div>  
                                        </div>
                                    )
                                }
                                
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsCom;