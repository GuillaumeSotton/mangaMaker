export const styles = theme => {
    return ({
        item: {
            paddingTop: "8px",
            cursor: "pointer",
        },
        padding: {
            marginLeft: theme.spacing(2),
        },
        backdrop: {
            height: "100%",
            width: "100%",
            zIndex: 2000,
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "black",
            opacity: 0.3,
        },
        menu: {
            position: "absolute",
            backgroundColor: "white",
            boxShadow: "4px 4px 20px #000",
            borderRadius: "4px",
            width: "300px",
            cursor: "auto",
            zIndex: 2010,
            top: "60px",
            right: "5px",
            padding: "10px",
            "& ul": {
                listStyle: "none",
                padding: 0,
                margin: 0,
                "& li": {
                    margin: "0.5em",
                },
            },
        },
        name: {
            fontSize: "1.2em",
        },
        email: {
            color: "#6C757D",
        },
        roles: {
            color: "#6C757D",
        },
    });
};
