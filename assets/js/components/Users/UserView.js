import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";


import { event } from "../../styles/users/users";

@withStyles(event)
class UserView extends Component {

    static propTypes = {
        classes: PropTypes.object,
        user: PropTypes.object,
    };

    render() {
        const { classes, user } = this.props;
        if(!user){
            return null;
        }

        return (
            <div className={classes.card}>
                <div className={classes.cardBody}>
                    <div className={"d-flex"}>
                        <div className={classes.user}>
                            <div className={classes.title}>Utilisateur</div>
                            <p>{user.last_name} {user.first_name}</p>
                        </div>

                        <div className={classes.email}>
                            <div className={classes.title}>Email</div>
                            <div className="">{user.email || " - "}</div>
                        </div>

                        <div className={classes.role}>
                            <div className={classes.title}>Rôle</div>
                            <div className="">{user.roles[0] || " - "}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export { UserView };