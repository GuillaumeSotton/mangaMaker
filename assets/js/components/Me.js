import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import User from "mdi-react/AccountIcon";
import PropTypes from "prop-types";

import { styles } from "../styles/me";
import axios from "axios";
import {api} from "../config";


@withStyles(styles)
class Me extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        me: null,
        show: false,
    };

    async componentDidMount() {
        const me = await axios.get(`${api.path}/me`);
        const data = me.data;

        this.setState({
            me: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                roles: data.roles[0],
            }
        });
    }

    onChange = state => {
        this.setState({ show: state });
    };

    render() {
        const { me, show } = this.state;
        const { classes } = this.props;

        return (
            <>
                <div className={`${classes.item} ${classes.padding}`} onClick={() => this.onChange(true)}>
                    <User color="#FFF" size={35}/>
                </div>

                {show &&
                <>
                    <div className={`${classes.backdrop}`} onClick={() => this.onChange(false)}/>
                    <div className={`${classes.menu}`}>
                        <ul>
                            <li className={classes.name}>{me.first_name} {me.last_name}</li>
                            <li className={classes.email}>{me.email}</li>
                            <li><a className={"btn btn-primary"} href={"/login"}>Déconnexion</a></li>
                        </ul>
                    </div>

                </>
                }
            </>
        );
    }
}


export { Me };