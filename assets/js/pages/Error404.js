import React from 'react';
import { Link } from 'react-router-dom';

class Error404 extends React.Component{
    render(){
        const style = {
            marginTop : "15%",
            marginRight: "auto",
            marginLeft: "auto",
            textAlign: "center",
        };

        return(
            <>
                <div id='error' style={style}>
                    <h1 className="notFoundTitle">Oops! La page demandée n'existe pas.</h1>
                    <p className="notFoundDesc">
                        Il semble que rien n'a été trouvé à cette adresse.
                        Cliquer sur le bouton ci-dessous pour retourner à la page principale.
                    </p>
                    <Link to={"/"} className={"btn btn-outline-secondary"}>Retourner au menu</Link>
                </div>
            </>
        );
    }
}

export { Error404 };