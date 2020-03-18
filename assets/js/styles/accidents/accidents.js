export const creator = () => {
    return ({
        header: {
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#6c757d",
        },
        subHeader: {
            fontSize: "0.8em",
            textAlign: "justify",
            color: "#6C757D",
        },

    });
};


export const event = () => ({
    customCard: {
        color: "inherit",
        "&:hover": {
            color: "inherit",
            textDecoration: "none",
        }
    },
    card: {
        boxShadow: "3px 3px 5px #999",
        "&:hover": {
            backgroundColor: "#eee",
        }
    },
    title: {
        fontSize: "12.8px",
        textAlign: "center",
    },
    date: {
        color: "#888",
    },
    center: {
        textAlign: "center",
    }
});

export const cardEvent = () => ({
    card: {
        boxShadow: "3px 3px 5px #999",
        marginBottom: "10px",
        "&:hover": {
            backgroundColor: "#eee",
        },
    },
    cardBody: {
        padding: "0.60rem",
    },
    bloc: {
        marginLeft: "60px",
    },
    title: {
        fontSize: "12.8px",
        color: "#999"
        // textAlign: "center",
    },
    site: {
        width: "180px",
        // textAlign: "right",
    },
    description: {
        width: "300px",
        // textAlign: "center",
    },
    entranceHour: {
        width: "300px",
        marginLeft: "25px",
        // textAlign: "center",
    },
});

