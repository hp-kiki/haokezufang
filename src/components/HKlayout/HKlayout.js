import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import {withRouter} from "react-router-dom"

 class HKlayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
    };
  }


  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="rgb(33, 185, 122)"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="Life"
            icon={<i className="iconfont icon-ind"></i>}
            selectedIcon={<i className="iconfont icon-ind"></i>
            }
            selected={this.props.match.path==='/'}
            onPress={() => {
             this.props.history.push('/')
            }}
          >
           {this.props.match.path==='/' && this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={
                <i className="iconfont icon-findHouse"></i>
            }
            selectedIcon={
                <i className="iconfont icon-findHouse"></i>
            }
            title="找房"
            key="Koubei"
            selected={this.props.match.path==='/info'}
            onPress={() => {
                this.props.history.push('/info')
            }}
          >
               {this.props.match.path==='/info' && this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={
                <i className="iconfont icon-infom"></i>
            }
            selectedIcon={
                <i className="iconfont icon-infom"></i>
            }
            title="资讯"
            key="Friend"
            selected={this.props.match.path==='/list'}
            onPress={() => {
                this.props.history.push('/list')
            }}
          >
               {this.props.match.path==='/list' && this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={ <i className="iconfont icon-myinfo"></i>}
            selectedIcon={ <i className="iconfont icon-myinfo"></i>}
            title="我的"
            key="my"
            selected={this.props.match.path==='/my'}
            onPress={() => {
                this.props.history.push('/my')
            }}
          >
             {this.props.match.path==='/my' && this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}


export default withRouter(HKlayout)
