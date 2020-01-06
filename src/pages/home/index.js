import React, { Component } from 'react'
import axios from "../../ulits/myaxios"
// import baseUrl from "../../ulits/baseulr"
import { Carousel } from 'antd-mobile';
import "./home.scss"
import nav1 from "../../asstes/images/nav-1.png" 
import nav2 from "../../asstes/images/nav-2.png" 
import nav3 from "../../asstes/images/nav-3.png" 
import nav4 from "../../asstes/images/nav-4.png" 

export default class index extends Component {
    state={
        swipriimg:[],
        imgHeight: 176,
        nav:[
            {id:1,imgSrc:nav1,title:'整租'},
            {id:2,imgSrc:nav2,title:'合租'},
            {id:3,imgSrc:nav3,title:'地图找房'},
            {id:4,imgSrc:nav4,title:'去出租'},
        ],
        news:[]
    }
    //发送请求
    componentDidMount(){
      //获取轮播图数据
        axios.get("/home/swiper").then(res=>{
            // console.log(res)
            this.setState({
                swipriimg:res.body
            })
        })
      //获取最新资讯数据
      axios.get("/home/news").then(res=>{
        // console.log(res)
        this.setState({
          news:res.body
        })
    })

    }
    render() {
        return (
            <div className="hk_home">
             {/* 轮播图 */}
              <div className="Hk_swiper">
               <Carousel
               autoplay={true}
               infinite
        >
          {this.state.swipriimg.map(val => (
            <a
              key={val.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`http://hkzf.zbztb.cn${val.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
               </div>

             {/* 导航 */}
             <div className="hk_nav">
                {this.state.nav.map(v=>
                    <div className="navs" key={v.id}>
                        <div className="nav">
                            <img src={v.imgSrc}></img>
                            <p>{v.title}</p>
                        </div>
                    </div>
                    )}
             </div>

             {/* 最新资讯 */}
             <div className="hk_zixun">
               <h3>最新资讯</h3>
               <div className="zixun_list">
                 {this.state.news.map(v=>
                  <div className="zixun" key={v.id}>
                    <div className="zixun-left">
                      <img src={`http://hkzf.zbztb.cn${v.imgSrc}`}></img>
                     
                    </div>
                    <div className="zixun-right">
                      <div className="right-top">{v.title}</div>
                      <div className="right-bottom">
                      <span className="form">{v.from}</span>
                        <span className="date">{v.date}</span>
                      </div>
                    </div>
                  </div>
                  )}
                 
               </div>
             </div>
                
            </div>
        )
    }
}
