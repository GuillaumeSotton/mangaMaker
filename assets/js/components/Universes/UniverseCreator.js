import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";

import { api } from "../../config";
import { creator } from "../../styles/universes/universes";
import { UniverseEditor } from "./UniverseEditor";
import { ProgressButton } from "../ProgressButton";


@withStyles(creator)
class UniverseCreator extends Component {

    static propTypes = {
        classes: PropTypes.object,
    };

    state = {
        fetchInProgress: false,
        universe: {
            name: "",
        },
    };

    onChange = (name, value) => {
        const universe = { ...this.state.universe };
        universe[name] = value;
        this.setState({ universe });
    };

    onCreate = async () => {
        const { universe } = this.state;

        this.setState({fetchInProgress: true});
        await axios.post(`${api.path}/universes`, universe);
        this.setState({fetchInProgress: false});
        this.setState({
            showEditor: false,
            universe: {
                name: "",
            },
        });
        window.location.reload();
    };

    //Check if all mandatory inputs have been completed
    checkValidationUniverse = (universe) => {
        return !(universe.name);
    };

    render() {
        const { classes } = this.props;
        const { fetchInProgress, universe } = this.state;

        const canCreate = this.checkValidationUniverse(universe);

        return (
            <>
                <div className="row mb-4">
                    <div className="col-12 text-right">
                        <ProgressButton label={"Create universe"} onClick={this.onCreate} showSpinner={fetchInProgress} disabled={canCreate || fetchInProgress}/>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <p className={classes.header}>New universe</p>
                        <p className={classes.subHeader}>
                            Add a new universe.
                        </p>
                    </div>

                    <div className="col-10">
                        <UniverseEditor onChange={this.onChange} universe={universe}/>
                    </div>
                </div>
            </>
        );
    }
}


export { UniverseCreator };