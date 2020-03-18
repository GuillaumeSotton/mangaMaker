import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";

import { sidebar } from "../styles/sidebar";
import Map from "mdi-react/MapIcon";
import Accidents from "mdi-react/AlertOctagonIcon";
import Sensors from "mdi-react/AccessPointNetworkIcon";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Site from "mdi-react/MapMarkerIcon";

@withStyles(sidebar)
class Sidebar extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    render() {
        const { classes } = this.props;
        const size = 36;

        return (
            <Navbar sticky="top" className={classes.main} bg={"dark"} variant={"dark"}>
                <Nav defaultActiveKey="/home" className={"flex-column "}>
                    <LinkContainer to="/" exact>
                        <Nav.Link>
                            <Map color={"white"} size={size}/>
                            <div>Carte</div>
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/accidents">
                        <Nav.Link>
                            <Accidents color={"white"} size={size}/>
                            <div>Accidents</div>
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/sites" exact>
                        <Nav.Link>
                            <Site color={"white"} size={size}/>
                            <div>Site</div>
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={"/lights"} exact>
                        <Nav.Link>
                            <Sensors color={"white"} size={size}/>
                            <div>Feux</div>
                        </Nav.Link>
                    </LinkContainer>

                    <div className={"versionNumberText"}>v.0.0.1</div>

                </Nav>
            </Navbar>
        );
    }
}


export { Sidebar };