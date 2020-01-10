import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import {withRouter} from "react-router-dom"
import axios from "../../ulits/myaxios"
import "./map.scss"
import { nonsense } from 'antd-mobile/lib/picker';
let BMap=window.BMap

 class index extends Component {
     state={
         islist:false,
         houes:[]
     }
     //定义数据
     sites=[
         {level:1,zoom:11,shape:"circle",name:'城市'},
         {level:2,zoom:15,shape:"circle",name:'区域'},
         {level:3,zoom:17,shape:"rect",name:'街道'},
     ]
      index=0

     componentDidMount(){
         this.init_map()
     }
     init_map= async (props)=>{
         this.map=new BMap.Map("allmap")
         this.map.centerAndZoom("广州",this.sites[this.index].zoom)
         this.map.addControl(new BMap.NavigationControl());  
         this.map.addControl(new BMap.ScaleControl());    
         let cityxinxi=(await axios.get("/area/info?name="+"广州")).body
         console.log(cityxinxi)
         //获取房源信息
         this.Housinginformation(cityxinxi)
        this.map.addEventListener("dragstart",(params)=>{
            this.setState({
                islist:false
            })
        })
     }

     //获取房源信息
     Housinginformation= async (cityobj)=>{
        let citys=(await axios.get("/area/map?id="+cityobj.value)).body
        console.log(citys)
        //清除障碍
        this.map.clearOverlays()
        if(this.index!==0 && this.index<3){
            this.map.centerAndZoom(new BMap.Point(cityobj.coord.longitude,cityobj.coord.latitude),this.sites[this.index].zoom)
        }
        citys.map(v=>{
            let point = new BMap.Point(v.coord.longitude,v.coord.latitude)
            let  myLabel=""
            if(this.sites[this.index].shape==="circle"){
                myLabel = new BMap.Label("<div class='label'>"+v.label+"<br/>"+v.count+"套</div>",     //为lable填写内容
                {offset:new BMap.Size(0,0),                  //label的偏移量，为了让label的中心显示在点上
               position:point
              }); 
            }else{
                myLabel = new BMap.Label("<div class='rect'>"+v.label+"<br/>"+v.count+"套</div>",     //为lable填写内容
                {offset:new BMap.Size(0,0),                  //label的偏移量，为了让label的中心显示在点上
               position:point
              }); 
            }

              myLabel.setStyle({
                border:"none",
                backgroundColor:"tranparent",
              })
              myLabel.addEventListener("click", (params) => {
                  if(this.index===3){
                        this.Housinglist(v)
                  }else{
                    this.Housinginformation(v)
                  }
             
             })
              this.map.addOverlay(myLabel);
             }
         )

       this.index++

     }


     Housinglist= async (v)=>{
         let houes=(await axios.get("/houses?cityId="+v.value)).body.list
         this.setState({
            houes,
            islist:true
         })
         console.log(houes)
     }

    render() {
        return (
            <div>
              <NavBar
               mode="light" 
               style={{background:"#f6f5f6"}}
               icon={<Icon type="left" />}
               onLeftClick={() => this.props.history.push('/')}
             >地图找房
             </NavBar>

         <div className="hk_bmap">
            <div id="allmap"></div>
            {/* 房源列表 */}
            <div className="houes">
                    <div className={this.state.islist?"houes_list-t":"houes_list-f"}>
                        <div className="list-title">
                            <h4 className="list-title-left">房屋列表</h4>
                            <span className="list-title-right">更多房源</span>
                        </div>
                        {this.state.houes.map((v,i)=>
                        <div className="list" key={i}>
                            <img src={`http://hkzf.zbztb.cn${v.houseImg}`}></img>
                            <div className="list-right">
                                <h4>{v.title}</h4>
                                <p className="list-right-two">{v.desc}</p>
                                 {v.tags.map((m,i)=>
                                  <span key={i}className="list-right-htree">{m}</span>
                                    )}
                               
                                <p className="list-right-jiage">{v.price}  <span>元/月</span></p>
                            </div>
                        </div>
                            )}
                    </div>
            </div>
         </div>
            </div>
        )
    }
}


export default withRouter(index)
