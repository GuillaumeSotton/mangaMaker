import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { homepage } from "../styles/homepage";

@withStyles(homepage)
class Homepage extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    render() {
        const { classes } = this.props;
        
        return (
            <>
            <div class="container">
                <div className={"row mb-5 mt-5"}>
                    <div id="block1" className="col-lg-6">
                        <img src="/images/create.png" className={classes.center}/>
                    </div>
                    <div id="block2" className="col-lg-6">
                        <img src="/images/discover.png" className={classes.center}/>
                    </div>
                </div>

                <div className={"row mb-5 mt-5"}>
                    <div id="block1" className="col-12 h-25">
                        <img src="/images/add.jpg" className={classes.center}/>
                    </div>
                </div>

        
            </div>
            </>
        );
    }

}


export { Homepage };
