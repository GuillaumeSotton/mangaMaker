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
        ressource: {
            file: null,
        }
    };

    onChange = (name, value) => {
        const ressource = { ...this.state.ressource };
        ressource[name] = value;
        this.setState({ ressource });
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
        const { ressource } = this.state;

        const formData = new FormData();
        formData.append("file", ressource.file);
        console.log(ressource.file, formData);
        

        this.setState({fetchInProgress: true});
        await axios.post(`${api.path}/submit/ressources`, formData);
        this.setState({fetchInProgress: false});
    };

    //Check if all mandatory inputs have been completed
    // checkValidationRessource = (ressource) => {
    //     return !();
    // };

    render() {
        const { classes } = this.props;
        const { fetchInProgress, ressource } = this.state;

        //const canUpload = this.checkValidationUser(user);
        console.log(ressource);

        return (
            <>
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <ProgressButton label={"Add ressource"} onClick={this.addRessource} showSpinner={fetchInProgress} disabled={fetchInProgress}/>
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
                        <SubmitRessourcesEditor onChange={this.onChange} ressource={ressource}/>
                    </div>
                </div>
            </>
        );
    }
}


export { SubmitRessourcesCreator };