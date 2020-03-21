import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";

import { api } from "../../config";
import { creator } from "../../styles/genres/genres";
import { GenreEditor } from "./GenreEditor";
import { ProgressButton } from "../ProgressButton";


@withStyles(creator)
class GenreCreator extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        fetchInProgress: false,
        genre: {
            name: "",
        },
    };

    onChange = (name, value) => {
        const genre = { ...this.state.genre };
        genre[name] = value;
        this.setState({ genre });
    };

    onCreate = async () => {
        const { genre } = this.state;

        this.setState({fetchInProgress: true});
        await axios.post(`${api.path}/genres`, genre);
        this.setState({fetchInProgress: false});
        this.setState({
            showEditor: false,
            genre: {
                name: "",
            },
        });
        window.location.reload();
    };

    //Check if all mandatory inputs have been completed
    checkValidationGenre = (genre) => {
        return !(genre.name);
    };

    render() {
        const { classes } = this.props;
        const { fetchInProgress, genre } = this.state;

        const canCreate = this.checkValidationGenre(genre);

        return (
            <>
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <ProgressButton label={"Create genre"} onClick={this.onCreate} showSpinner={fetchInProgress} disabled={canCreate || fetchInProgress}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <p className={classes.header}>New Genre</p>
                        <p className={classes.subHeader}>
                            Add a new Genre.
                        </p>
                    </div>

                    <div className="col-10">
                        <GenreEditor onChange={this.onChange} genre={genre}/>
                    </div>
                </div>
            </>
        );
    }
}


export { GenreCreator };