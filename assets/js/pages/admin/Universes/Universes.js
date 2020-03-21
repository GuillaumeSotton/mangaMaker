import React, { Component } from "react";

import { UniverseList } from "../../../components/Universes/UniverseList";
import { UniverseCreator } from "../../../components/Universes/UniverseCreator";

class Universes extends Component {

    render() {
        return (
            <>
                <div className={"container"}>
                    <h1 className={"mb-4"}>Universes administration</h1>

                    <UniverseCreator/>

                    <UniverseList/>
                </div>
            </>
        );
    }
}

export { Universes };
