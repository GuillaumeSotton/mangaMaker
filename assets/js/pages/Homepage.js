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
                <div className={"row"} style={{marginTop: "10%",paddingTop: "1%", width: "100%"}}>
                    <div id="block1" className="col-lg-6">
                        <img src="/images/create.png" className={classes.center}/>
                    </div>
                    <div id="block2" className="col-lg-6">
                        <img src="/images/discover.png" className={classes.center}/>
                    </div>
                </div>

                <div className="row">
                    Ad1
                </div>

                <div className= "row">
                    <h1>Follow us on social networks :</h1>
                    <p>Twitter, Insta</p>
                </div>
            </div>
            </>
        );
    }

}


export { Homepage };
