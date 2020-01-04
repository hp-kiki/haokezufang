import React, { Component } from 'react'
import axios from "../../ulits/myaxios"

export default class index extends Component {

    //发送请求
    componentDidMount(){
        axios.get("/home/swiper").then(res=>{
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                home
            </div>
        )
    }
}
