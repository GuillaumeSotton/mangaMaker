import React, { Component } from "react";

import { GenreList } from "../../../components/Genres/GenreList";
import { GenreCreator } from "../../../components/Genres/GenreCreator";

class Genre extends Component {

    render() {
        return (
            <>
                <div className={"container"}>
                    <h1 className={"mb-4"}>Genre administration</h1>

                    <GenreCreator/>

                    <GenreList/>
                </div>
            </>
        );
    }
}

export { Genre };
