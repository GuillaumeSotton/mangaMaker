import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { event } from "../../styles/universes/universes";

@withStyles(event)
class UniverseView extends Component {

    static propTypes = {
        classes: PropTypes.object,
        universe: PropTypes.object,
    };

    render() {
        const { classes, universe } = this.props;
        if(!universe){
            return null;
        }

        console.log(universe);

        return (
            <div className={classes.card}>
                <div className={classes.cardBody}>
                    <div className={"d-flex"}>
                        <div className={classes.universe}>
                            <div className={classes.title}>Name</div>
                            <p>{universe.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export { UniverseView };