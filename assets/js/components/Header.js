import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { Me } from "./Me";
import Navbar from "react-bootstrap/Navbar";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Nav from "react-bootstrap/Nav";
import Wrench from "mdi-react/WrenchIcon";

import { header } from "../styles/header";

@withStyles(header)
class Header extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    render() {
        const { classes } = this.props;

        return (
            <>
                <Navbar bg="primary" variant="dark" className={classes.header}>
                    <Navbar.Brand href="/"><img src="/images/Logo.png" className="img-responsive" style={{width:"70%"}}/></Navbar.Brand>

                    <NavbarCollapse className="justify-content-end">
                        <LinkContainer to="/me">
                            <Me/>
                        </LinkContainer>

                        <LinkContainer to="/admin">
                            <Nav.Link><Wrench color="#FFF" size={25}/></Nav.Link>
                        </LinkContainer>
                    </NavbarCollapse>


                </Navbar>
            </>
        );
    }
}

export { Header };
