import React, { Component } from "react";


import { UserList } from "../components/Users/UserList";
import { UserCreator } from "../components/Users/UserCreator";

class Users extends Component {

    render() {
        return (
            <>
                <div className={"container"}>
                <h1 className={"mb-4"}>Administration utilisateurs</h1>

                <UserCreator/>

                <UserList/>
                </div>
            </>
        );
    }
}

export { Users };
