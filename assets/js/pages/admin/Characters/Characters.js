import React, { Component } from "react";

import { CharacterList } from "../../../components/Characters/CharacterList";
import { CharacterCreator } from "../../../components/Characters/CharacterCreator";

class Characters extends Component {

    render() {
        return (
            <>
                <div className={"container"}>
                    <h1 className={"mb-4"}>Characters administration</h1>

                    <CharacterCreator/>

                    {/* <CharactesList/> */}
                </div>
            </>
        );
    }
}

export { Characters };
