import React from "react"
import { WelcomeWindow } from "./WelcomeWindow"
import { Route } from "react-router"
import { Issues } from "./Issues"
import { Repositories } from "./Repositories"
import { PullRequests } from "./PullRequests"

export const App = () => {
  return (
    <blessed-box
      style={{
        bg: "#0000ff",
      }}
    >
     <Route exact path="/" component={WelcomeWindow}/>
     <Route path="/issues" component={Issues}/>
     <Route path="/repositories" component={Repositories}/>
     <Route path="/pull-requests" component={PullRequests}/>
    </blessed-box>
  )
}
