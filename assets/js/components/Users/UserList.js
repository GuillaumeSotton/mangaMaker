import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import { event } from "../../styles/users/users";
import { UserRoleSelector } from "../Users/UserRoleSelector";
import { ClearableInput } from "../ClereableInput";
import { UserView } from "./UserView";
import axios from "axios";
import {api} from "../../config";


@withStyles(event)
class UserList extends Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        filter: {
            name: "",
            role: null,
        },
        users: [],
    };

    async componentDidMount() {
        const users = await axios.get(`${api.path}/users`);
        this.setState({users: users.data})
    }

    onFilterChange = (name, value) => {
        const filter = { ...this.state.filter };

        filter[name] = value;
        this.setState({ filter });
    };


    render() {
        const { classes } = this.props;
        const { filter, users } = this.state;

        const allUsers = users.filter(user => {
            if (filter.name && user.last_name !== filter.name)
                return false;

            else if (filter.role && user.roles[0] !== filter.role)
                return false;

            return true;
        });


        return (
            <>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <label htmlFor="email">Filtre par nom</label>
                        <ClearableInput onChange={this.onFilterChange} filter={filter.name} name={"name"} id={"name"}/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="role">Filtre par rôle</label>
                        <UserRoleSelector id={"role"} name={"role"} value={filter.role} onChange={this.onFilterChange}/>
                    </div>
                </div>

                {
                    allUsers.map(user => {
                        return (
                            <Link key={user.id} to={`/users/${user.id}`} className={classes.customCard}>
                                <UserView user={user}/>
                            </Link>
                        );
                    })
                }
            </>
        );
    }
}


export { UserList };