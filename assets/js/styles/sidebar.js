
import { headerHeight } from "./header";

export const sidebarWidth = "135px";

export const sidebar = () => {
    return ({
        // Cette règle css a pour principal but de casser les règles css de <NavBar />
        main: {
            width: sidebarWidth,
            backgroundColor: "#3A3F44 !important",
            minHeight: `calc(100vh - ${headerHeight})`,
            display: "block",
            boxShadow: "5px 0 5px -5px black",
            padding: "0",
            "& a": {
                paddingTop: "25px",
                textAlign: "center",
                "&:not(.active)": {
                    opacity: "0.5",
                },
            },

        }
    });
};

