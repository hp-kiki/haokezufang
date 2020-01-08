import React, { Component } from 'react'
import axios from "../../ulits/myaxios"
import "./citylist.scss"
// import ReactDOM from 'react-dom';
import {AutoSizer, List} from 'react-virtualized';
import 'react-virtualized/styles.css';

export default class index extends Component {
    state={
        leftcitylist:[] ,
        rightcityzimu:[],
        select_index:0
    }

    constructor(props){
        super(props)
        this.MainList=React.createRef()
    }
    
    componentDidMount(){
        this.Structuralcity()
    }
   
    //构造数据
    async Structuralcity(){
        //左边
        let leftcitylist=[
            {"当前定位":["广州"]}
        ]
        //获取热门城市
        let hotcity=(await axios.get("/area/hot")).body
        let newhotcity= hotcity.map(v=>{
            return v.label
        })
        leftcitylist.push({
            "热门城市":newhotcity
        })
        //获取全部城市
        let allcity=(await axios.get("/area/city?level=1")).body
        //排序
        allcity.sort(function(a,b){
            return a.short.localeCompare(b.short)
        })
        //将排序后的全部城市放在leftcitylist数组里面
         allcity.map(v=>{
           let daxie= v.short[0].toUpperCase()
        //    console.log(daxie)  findIndex有就返回当前索引，没有就返回-1
          let index=leftcitylist.findIndex(vv=>{
              if(vv[daxie]){
                  return true
              }
          })
          index===-1?leftcitylist.push({[daxie]:[v.label]}):leftcitylist[index][daxie].push(v.label)
        })
        //此时左边的数据以及可以了
        // console.log(leftcitylist)
        //获取右边的数据
        let rightcityzimu= leftcitylist.map(v=>Object.keys(v)[0])
        rightcityzimu[0]="#"
        rightcityzimu[1]="热"
        // console.log(rightcityzimu)

        this.setState({
            rightcityzimu,leftcitylist
        })
    }
   
    //计算高度
    rowHeight({index}){
        let item=this.state.leftcitylist[index]
        return (Object.values(item)[0].length+1)*50
    }

    rowRenderer({
        index, // 现在的行记录
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        key, // Unique key within array of rendered rows
        parent, // Reference to the parent List (instance)
        style, // Style object to be applied to row (to position it);
    }){
        let item=this.state.leftcitylist[index]
        let key_name=Object.keys(item)[0]
        let list =Object.values(item)[0]
        // console.log(list)
        return (
          <div key={key} style={style} className="citylist">
             <div className="city-title">{key_name}</div>
             {
                 list.map((v,i)=>
                 <div className="city-label" key={i}>
                     {v}
                 </div>
                 )
             }
          </div>
        );
      }



      onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
       
        this.setState({
            select_index:startIndex
        })
    }

    onLetter=(row)=>{
        // console.log(123)
        this.MainList.current.scrollToRow(row)
        this.setState({
            select_index:row
        })
    }


    render() {
        return (
            <div className="hk_citylist">
                <div className="hk_citylist-header">
                    <div className="hk_citylist-nei">
                    <i className="iconfont icon-back" onClick={()=>window.history.go(-1)}></i>
                    <span>城市选择</span>
                    </div>
                </div>
                <div className="hk_citylist_bottom">
                <AutoSizer>
                  {({height, width}) => (
                   <List
                   ref={this.MainList}
                   height={height}
                   rowCount={this.state.leftcitylist.length}
                   rowHeight={this.rowHeight.bind(this)}
                   rowRenderer={this.rowRenderer.bind(this)}
                   width={width} 
                   onRowsRendered={this.onRowsRendered} 
                   scrollToAlignment="start"
                  />
                     )}
              </AutoSizer>

              {/* 右边 */}
              <div className="citylist_bottom-right">
                  {
                      this.state.rightcityzimu.map((v,i)=>
                    <div className=
                    {this.state.select_index===i? "bottom-rights active":"bottom-rights"} 
                    onClick ={this.onLetter.bind(this,i)}
                    key={i}>
                    {v}
                    </div>
                  )
                }
              </div>

                </div>
            </div>
        )
    }
}
