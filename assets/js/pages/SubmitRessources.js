import React, { Component } from "react";

import { SubmitRessourcesCreator } from "../components/SubmitRessources/SubmitRessourcesCreator";

class SubmitRessources extends Component {

    render() {
        return (
            <>
                <div className={"container"}>
                  <h1 className={"mb-4"}>Ressources submissions</h1>
                  <SubmitRessourcesCreator/>
                </div>
            </>
        );
    }
}

export { SubmitRessources };
