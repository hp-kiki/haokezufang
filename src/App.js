import React, { Component,Fragment } from 'react'
import { HashRouter as Router,Route} from "react-router-dom"
import Home from "./pages/home"
import Info from "./pages/info"
import List from "./pages/list"
import My from "./pages/my"
import Citylist from "./pages/citylist"
import Map from "./pages/map"
import Hklayout from "./components/HKlayout/HKlayout"

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route exact path="/" render={(props)=><Hklayout><Home {...props}/></Hklayout>}></Route>
          <Route exact path="/info" render={(props)=><Hklayout><Info {...props}/></Hklayout>}></Route>
          <Route exact path="/list" render={(props)=><Hklayout><List {...props}/></Hklayout>}></Route>
          <Route exact path="/my" render={(props)=><Hklayout><My {...props}/></Hklayout>}></Route>
          <Route exact path="/citylist" render={(props)=><Citylist {...props}/>}></Route>
          <Route exact path="/map" render={(props)=><Map {...props}/>}></Route>

        </Router>
      </Fragment>
    )
  }
}
