import { sidebarWidth } from "../sidebar";


export const container = () => {
    return ({
        container: {
            width: `calc(100vw - ${sidebarWidth})`,
            display: "flex",
            height: "100%",
        },
        map: {
            position: "relative",
            width: "100%",
        },
        infos: {
            width: "35%",
            margin: "10px 10px 0 auto",
        }
    });
};