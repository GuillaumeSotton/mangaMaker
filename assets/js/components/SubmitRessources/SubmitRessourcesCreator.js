import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";

import { api } from "../../config";
import { creator } from "../../styles/users/users";
import { SubmitRessourcesEditor } from "./SubmitRessourcesEditor";
import { ProgressButton } from "../ProgressButton";

@withStyles(creator)
class SubmitRessourcesCreator extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        fetchInProgress: false,
        genre: null,
        file: null,
        perso: null,
        type: "",
        universe: null,
    };

    onChange = (name, value) => {
        const ressource = { ...this.state.ressource };
        console.log(name,value);
        if(name === "genre"){
            this.setState({genre: Number.parseInt(value)});
        }
        if(name === "file"){
            this.setState({file: value});
        }
        if(name === "perso"){
            this.setState({perso: Number.parseInt(value)});
        }
        if(name === "type"){
            this.setState({type: value});
        }
        if(name === "universe"){
            this.setState({universe: Number.parseInt(value)});
        }
    };

    onSend = async () => {
        const { content, file } = this.state;
  
        const formData = new FormData();
        formData.append("file", file);
        formData.append("message", content);
  
        this.setState({fetchInProgress: true});
        await postFormData(`${api.path}/ressources/submissions`, formData);
        this.setState({fetchInProgress: false});
     };

    addRessource = async () => {
        const { genre, file, perso, universe, type } = this.state;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("genre", genre);
        formData.append("perso", perso);
        formData.append("type", type);
        formData.append("universe", universe);

        this.setState({fetchInProgress: true});
        await axios.post(`${api.path}/submit/ressources`, formData);
        this.setState({fetchInProgress: false});
    };

    //Check if all mandatory inputs have been completed
    checkValidationRessource = (genre, file, perso, universe, type) => {
        if(type === "Background"){
            return !(file && genre);
        }
        return !(genre && file && perso && universe && type);
    };

    render() {
        const { classes } = this.props;
        const { fetchInProgress, genre, file, perso, universe, type } = this.state;

        const canUpload = this.checkValidationRessource(genre, file, perso, universe, type);

        return (
            <>
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <ProgressButton label={"Add ressource"} onClick={this.addRessource} showSpinner={fetchInProgress} disabled={canUpload || fetchInProgress}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <p className={classes.header}>New ressource</p>
                        <p className={classes.subHeader}>
                            Add a new ressource
                        </p>
                    </div>

                    <div className="col-10">
                        <SubmitRessourcesEditor onChange={this.onChange} genre={genre} file={file} perso={perso} type={type} universe={universe}/>
                    </div>
                </div>
            </>
        );
    }
}


export { SubmitRessourcesCreator };