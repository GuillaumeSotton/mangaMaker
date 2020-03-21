import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { event } from "../../styles/genres/genres";

@withStyles(event)
class GenreView extends Component {

    static propTypes = {
        classes: PropTypes.object,
        genre: PropTypes.object,
    };

    render() {
        const { classes, genre } = this.props;
        if(!genre){
            return null;
        }

        return (
            <div className={classes.card}>
                <div className={classes.cardBody}>
                    <div className={"d-flex"}>
                        <div className={classes.genre}>
                            <div className={classes.title}>Name</div>
                            <p>{genre.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export { GenreView };