const express=require('express')
const app=express()
const axios=require('axios')

app.get('/',(req,res)=>{
    res.send("返回抗疫数据的api服务器")
})
app.get('/api/newsdata',async (req,res)=>{
    //解决ajax跨域问题res.append()
    res.append("Access-Control-Allow-Origin","*")
    res.append("Access-Control-Allow-content-type","*")
    //请求数据
    let result=await axios.get('https://i.snssdk.com/forum/ncov_data/?activeWidget=1&data_type=%5B2%2C4%2C8%5D&src_type=map')
    let data=result.data;
    res.send(data)
})
app.get('/api/news',async (req,res)=>{
    //解决ajax跨域问题res.append()
    res.append("Access-Control-Allow-Origin","*")
    res.append("Access-Control-Allow-content-type","*")
    //请求数据
    let result=await axios.get('https://i.snssdk.com/api/feed/forum_flow/v1/?activeWidget=1&query_id=1656810113086509&tab_id=1656810113086525&category=forum_flow_subject&is_preview=0&stream_api_version=82&aid=13&offset=0&count=20')
    let data=result.data;
    res.send(data)
})


app.listen(8080,()=>{
    console.log("sever Start")
    console.log("http://localhost:8080")
    console.log("http://localhost:8080/api/newsdata")
    console.log("http://localhost:8080/api/news")
})