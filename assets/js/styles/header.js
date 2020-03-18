
export const headerHeight = "80px";

export const header = theme => {
    return ({
        header: {
            height: headerHeight,
        },
        item: {
            paddingTop: "8px",
        },
        padding: {
            marginLeft: theme.spacing(2),
        },
        badge: {
            position: "relative",
            top: "-10px",
            left: "-10px",
        },
        logo: {
            height: "40px",
        },
    });
};

