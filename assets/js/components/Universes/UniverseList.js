import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import { event } from "../../styles/universes/universes";
import { ClearableInput } from "../ClereableInput";
import { UniverseView } from "./UniverseView";
import axios from "axios";
import {api} from "../../config";


@withStyles(event)
class UniverseList extends Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        filter: {
            name: "",
        },
        universes: [],
    };

    async componentDidMount() {
        const universes = await axios.get(`${api.path}/universes`);
        console.log(universes);
        this.setState({universes: universes.data})
    }

    onFilterChange = (name, value) => {
        const filter = { ...this.state.filter };
        filter[name] = value;
        this.setState({ filter });
    };


    render() {
        const { classes } = this.props;
        const { filter, universes } = this.state;

        const allUniverses = universes.filter(universe => {
            if (filter.name && universe.name !== filter.name)
                return false;
            return true;
        });


        return (
            <>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <label htmlFor="email">Filter by name</label>
                        <ClearableInput onChange={this.onFilterChange} filter={filter.name} name={"name"} id={"name"}/>
                    </div>
                </div>

                {
                    allUniverses.map(universe => {
                        return (
                            <Link key={universe.id} to={`/universes/${universe.id}`} className={classes.customCard}>
                                <UniverseView universe={universe}/>
                            </Link>
                        );
                    })
                }
            </>
        );
    }
}


export { UniverseList };