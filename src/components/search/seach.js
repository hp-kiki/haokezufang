import React, { Component } from 'react'
import "./seach.scss"
import {withRouter} from "react-router-dom"

 class seach extends Component {
    render() {
        return (
        <div>
            <div className="search">
                <div className="search-input">
                    <div className="input-diqu" onClick={(props)=>{
                        this.props.history.push("/citylist")
                    }}>
                        <span>上海</span>
                        <i className="iconfont icon-arrow"></i>
                    </div>
                    <div className="input-kuang">
                       <i className="iconfont icon-seach"></i>
                       <span>请输入小区或地址</span>
                    </div>
                </div>
                <div className="search-icon" onClick={(props)=>{
                        this.props.history.push("/map")
                    }}>
                    <i className="iconfont icon-map"></i>
                </div>
            </div>
            </div>
        )
    }
}


export default withRouter(seach)