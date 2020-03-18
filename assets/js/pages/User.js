import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import {api} from "../config";

import { ProgressButton } from "../components/ProgressButton";
import {RequiredInput} from "../components/RequiredInput";
import {EmailInput} from "../components/EmailInput";
import {UserRoleSelector} from "../components/Users/UserRoleSelector";


class User extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,
    };

    state = {
        fetchInProgressUpdate: false,
        user: null,
    };

    async componentDidMount() {
        const { match: { params } } = this.props;
        const user = await axios.get(`${api.path}/users/${params.id}`);
        const data = user.data;

        this.setState({
            user: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                roles: data.roles[0],
            }
        });
    }

    onChange = (name, value) => {
        const { user } = this.state;

        if(name === "roles"){
            user[name] = value.split();
        }
        else{
            user[name] = value;
        }
        this.setState({ user: { ...user } });
    };

    onSave = async () => {
        const { history } = this.props;
        const { user } = this.state;
        if (!user)
            return;

        //Check if roles field has been converted to array
        if (typeof user.roles === 'string') {
            user.roles = user.roles.split()
        }

        this.setState({ fetchInProgressUpdate: true });
        await axios.put(`${api.path}/users/${user.id}`, user);
        this.setState({ fetchInProgressUpdate: false });
        history.push("/users");
    };

    //Check that all mandatory fields have been completed
    checkValidationUser = (user) => {
        return !(user.first_name && user.last_name && user.email && user.roles);
    };

    render() {
        const { fetchInProgressUpdate, user } = this.state;
        if (!user)
            return null;

        const canModify = this.checkValidationUser(user);

        return (
            <>
                <div className={"container"}>
                    <h1 className={"my-2 mb-4 d-flex"}>
                        <span className={""}>Utilisateur n°{user.id}</span>
                    </h1>

                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="lastName">Nom*</label>
                            <RequiredInput id={"last_name"} name={"last_name"} value={user.last_name} onChange={this.onChange} isrequired/>
                        </div>

                        <div className="col-6">
                            <label htmlFor="firstName">Prénom*</label>
                            <RequiredInput id={"first_name"} name={"first_name"} value={user.first_name} onChange={this.onChange} isrequired/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-6">
                            <label htmlFor="personCount">Email*</label>
                            <EmailInput id={"email"} name={"email"} isRequired value={user.email} onChange={this.onChange} isrequired/>
                        </div>

                        <div className="col-6">
                            <label htmlFor="role">Rôle*</label>
                            <UserRoleSelector id={"roles"} value={user.roles} name={"roles"} onChange={this.onChange} isrequired/>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <div className="">
                            <Link to={"/users"} className={"btn btn-outline-secondary mr-3"}>Annuler</Link>
                            <ProgressButton label={"Modifier"} disabled={canModify || fetchInProgressUpdate} showSpinner={fetchInProgressUpdate} onClick={this.onSave}/>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}


export { User };

