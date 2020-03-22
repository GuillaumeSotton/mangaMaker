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
                    <h1 className="notFoundTitle">Oops! This page does not exist.</h1>
                    <p className="notFoundDesc">
                        It seems that nothing has been found at this URL.
                        Click on the button to go back to the homepage.
                    </p>
                    <Link to={"/"} className={"btn btn-outline-secondary"}>Go back to the homepage</Link>
                </div>
            </>
        );
    }
}

export { Error404 };