import React, { Component } from "react";
import { Link } from "react-router-dom";


class AdminBase extends Component {
   render() {

      const tabs = [
         { header: "Users", text: "Allowed to manage users of the website", path: "/admin/users" },
         { header: "Universes", text: "Allowed to manage universes of the website", path: "/admin/universes" },
         { header: "Characters", text: "Allowed to manage characters of the website", path: "/admin/characters" },
         { header: "Genre", text: "Allowed to manage genre of the website", path: "/admin/genre" },
      ];

      return (
         <>
            <div className="container">
               <h1 className={"mb-4"}>Administration</h1>
               <div className={"row"}>
                  {tabs.map((tab, index) => {
                     return (
                        <div key={index} className="col-3 mb-4">
                           <div className="card">
                              <div className="card-header h3">{tab.header}</div>
                              <div className="card-body">
                                 <p className="card-text">{tab.text}</p>
                                 <Link to={tab.path} className="btn btn-primary">Access</Link>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </>
      );
   }
}


export { AdminBase };
