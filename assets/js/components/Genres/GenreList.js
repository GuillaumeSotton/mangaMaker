import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import { event } from "../../styles/genres/genres";
import { ClearableInput } from "../ClereableInput";
import { GenreView } from "./GenreView";
import axios from "axios";
import {api} from "../../config";


@withStyles(event)
class GenreList extends Component {
    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        filter: {
            name: "",
        },
        genres: [],
    };

    async componentDidMount() {
        const genres = await axios.get(`${api.path}/genres`);
        this.setState({genres: genres.data})
    }

    onFilterChange = (name, value) => {
        const filter = { ...this.state.filter };
        filter[name] = value;
        this.setState({ filter });
    };


    render() {
        const { classes } = this.props;
        const { filter, genres } = this.state;

        const allgenres = genres.filter(genre => {
            if (filter.name && genre.name !== filter.name)
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
                    allgenres.map(genre => {
                        return (
                            <Link key={genre.id} to={`/genres/${genre.id}`} className={classes.customCard}>
                                <GenreView genre={genre}/>
                            </Link>
                        );
                    })
                }
            </>
        );
    }
}


export { GenreList };