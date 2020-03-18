import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { container } from "../styles/map/map";

@withStyles(container)
class Homepage extends Component {
    _isMounted = false;

    static propTypes = {
        classes: PropTypes.object,
    };

    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.container}>
               <h1>Salut les biatchs !!!!</h1>
            </div>
        );
    }

}


export { Homepage };
