import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";

import { api } from "../../config";
import { creator } from "../../styles/users/users";
import { UserEditor } from "./UserEditor";
import { ProgressButton } from "../ProgressButton";


@withStyles(creator)
class UserCreator extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        fetchInProgress: false,
        user: {
            email: "",
            first_name: "",
            last_name: "",
            roles: "",
            password: "",
        },
    };

    onChange = (name, value) => {
        const user = { ...this.state.user };
        if(name === "roles"){
            user[name] = value.split();
        }
        else{
            user[name] = value;
        }
        this.setState({ user });
    };

    onCreate = async () => {
        const { user } = this.state;

        this.setState({fetchInProgress: true});
        await axios.post(`${api.path}/users`, user);
        this.setState({fetchInProgress: false});
        this.setState({
            showEditor: false,
            user: {
                email: "",
                first_name: "",
                last_name: "",
                roles: "",
                password: "",
            },
        });
        window.location.reload();
    };

    //Check if all mandatory inputs have been completed
    checkValidationUser = (user) => {
        return !(user.email && user.first_name && user.last_name && user.roles && user.password);
    };

    render() {
        const { classes } = this.props;
        const { fetchInProgress, user } = this.state;

        const canCreate = this.checkValidationUser(user);

        return (
            <>
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <ProgressButton label={"Créer l'utilisateur"} onClick={this.onCreate} showSpinner={fetchInProgress} disabled={canCreate || fetchInProgress}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <p className={classes.header}>Nouvel utilisateur</p>
                        <p className={classes.subHeader}>
                            Ajoutez un nouvel utilisateur.
                        </p>
                    </div>

                    <div className="col-10">
                        <UserEditor onChange={this.onChange} user={user}/>
                    </div>
                </div>
            </>
        );
    }
}


export { UserCreator };