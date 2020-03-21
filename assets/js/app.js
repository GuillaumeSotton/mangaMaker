import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import moment from "moment/moment";
import "moment-timezone";

import "bootstrap/dist/css/bootstrap.css";
import "../css/app.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Homepage } from "./pages/Homepage";
import { User } from "./pages/User";
import { Users } from "./pages/Users";
import { SubmitRessources } from "./pages/SubmitRessources";
import { AdminBase } from "./pages/AdminBase";
import { Universes } from "./pages/admin/Universes/Universes";
import { Characters } from "./pages/admin/Characters/Characters.js";
import { Genre } from "./pages/admin/Genre/Genre";
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
                    <Route path="/admin/universes" exact component={Universes}/>
                    <Route path="/admin/characters" exact component={Characters}/>
                    <Route path="/admin/genre" exact component={Genre}/>
                    <Route path="/admin" exact component={AdminBase}/>
                    <Route path="/ressources/submissions" exact component={SubmitRessources}/>
                    <Route exact path="/users/:id(\d+)" component={User}/>
                    <Route path="/users" exact component={Users}/>
                    <Route path="*" component={Error404} />
                </Switch>
            </div>
            <Footer/>
            </BrowserRouter>
    );
    }
}

export { App };
