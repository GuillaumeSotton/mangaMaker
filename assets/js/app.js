import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import moment from "moment/moment";
import "moment-timezone";

import "bootstrap/dist/css/bootstrap.css";
import "../css/app.css";

import { Header } from "./components/Header";
import { Homepage } from "./pages/Homepage";
import { User } from "./pages/User";
import { Users } from "./pages/Users";
import { Error404 } from "./pages/Error404";


class App extends Component {

    componentDidMount() {
        moment.locale("fr");
        moment.tz.setDefault("Europe/Paris");
    }

    render() {
        return (
            <BrowserRouter basename={"/dashboard"}>

            <Header/>
            <div className={"d-flex"}>
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route exact path="/users/:id(\d+)" component={User}/>
                    <Route path="/users" exact component={Users}/>
                    <Route path="*" component={Error404} />
                </Switch>
            </div>
            </BrowserRouter>
    );
    }
}

export { App };