import React, { Component } from "react";

import Instagram from "mdi-react/InstagramIcon";
import Twitter from "mdi-react/TwitterIcon";

class Footer extends Component {

  render() {
    return (
      <>
        <footer className="page-footer font-small bg-primary pt-2 w-100 h-10">
          <div className="d-flex bd-highlight">
            <div className="p-2 bd-highlight">
              <strong>Follow us on social media:</strong>
            </div>
            <div className="p-2 bd-highlight">
              <a href="https://www.instagram.com/jesuistropdrole/">
                <Instagram />
              </a>
            </div>
            <div className="p-2 bd-highlight">
              <a href="https://twitter.com/RasenCSGO">
                <Twitter />
              </a>
            </div>
            <div className="ml-auto mr-2 p-2 bd-highlight">
              <strong>© 2020 Copyright</strong>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export { Footer };
