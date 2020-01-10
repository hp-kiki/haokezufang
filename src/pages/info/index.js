import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import Srarch from '../../components/search/seach'
import axios from '../../ulits/myaxios'
import {withRouter} from "react-router-dom"
import './info.scss'
import {AutoSizer, List} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

class index extends Component {
    state={
        citylist:[],
        
    }

    pagesize=20
    number={
        start:1,
        end:20
    }
    loading=true
    count=0
    componentDidMount(){
        this.Requestcity()
    }

    //发请求获得数据列表
    Requestcity= async (props)=>{
        //城市的value
        let citylist_value=(await axios.get('/area/info?name='+"广州")).body.value
        
        this.number.citylist_value=citylist_value
        console.log(this.number)
        // 城市列表
        let citylist=(await axios.get("/houses",{
            params:this.number
        })).body
        this.loading=false
        console.log(citylist)
        this.setState({
            citylist:[...this.state.citylist,...citylist.list]
        })
        this.count=citylist.count
    }

    //渲染列表
    rowRenderer=({key, index, style})=>{
        let v=this.state.citylist[index] 
        return (
            <div className="list" key={key} style={style}>
                <img src={`http://hkzf.zbztb.cn${v.houseImg}`}></img>
                <div className="list-right">
                    <h4>{v.title}</h4>
                    <p className="list-right-two">{v.desc}</p>
                     {v.tags.map((m,i)=>
                      <span key={i}className="list-right-htree">{m}</span>
                        )}
                    <p className="list-right-jiage">{v.price}<span>元/月</span></p>
                </div>
            </div>
        )

    }

    //刷新页面
    onScroll=({ clientHeight, scrollHeight, scrollTop })=>{
        if(scrollHeight-clientHeight-scrollTop<20){
            if(this.number.end<this.count && !this.loading){
                this.number.start+=this.pagesize
                this.number.end+=this.pagesize
                this.loading=true
                this.Requestcity()
            }

        }
    }


    render() {
        return (
            <div className="hk_info">
                {/* 头部搜索 */}
               <NavBar
                   style={{background:'#f6f5f6'}}
                   mode="light"
                   icon={<Icon type="left" style={{ color: '#9c9999' }}/>}
                   onLeftClick={() => this.props.history.push('/')}
                    ></NavBar>
                  <div className="hk_info-hader">
                    <Srarch className="Srarch"/>
                 </div>

                 {/* 找房列表 */}
                <div className="citylist">
                <AutoSizer>
                    {({height, width}) => (
                       <List
                           height={height}
                    rowCount={this.state.citylist.length}
                      rowHeight={125}
                       rowRenderer={this.rowRenderer} 
                       onScroll={this.onScroll}
                       width={width}
                  />
               )}
               </AutoSizer>
                </div>
            </div>
        )
    }
}

export default withRouter(index)
