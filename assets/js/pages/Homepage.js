import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { homepage } from "../styles/homepage";
import { Link } from 'react-router-dom';

@withStyles(homepage)
class Homepage extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    onMouseEnter = () => {

    };

    onMouseOut = () => {

    };

    render() {
        const { classes } = this.props;

        return (
            <>
            <div className="container">
                <div className={"row mb-5 mt-5"}>
                    <div id="block1" className={`col-lg-4 mb-4 ${classes.center}`}>
                        <img src="/images/create.png" className={classes.hovereffect}/>
                    </div>
                    <div id="block2" className={`col-lg-4 mb-4 ${classes.center}`}>
                        <img src="/images/discover.png" className={classes.hovereffect}/>
                    </div>
                    <div id="block3" className={`col-lg-4 mb-4 ${classes.center}`}>
                        <Link to={"/ressources/submissions"}>
                            <img src="/images/submit.png" className={classes.hovereffect}/>
                        </Link>
                    </div>
                </div>

                <div className={"row mb-5 mt-2"}>
                    <div id="block1" className="col-lg-12">
                        <img src="/images/naru.png" className="img-responsive" style={{width:"100%"}}/>
                    </div>
                </div>


            </div>
            </>
        );
    }

}


export { Homepage };
