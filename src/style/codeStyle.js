export const bannerStyle = {
    banner: {
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 15px",
        marginBottom: "20px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        borderRadius: "15px",
        top: 0,
        zIndex: 100,
    },
    title: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "20px",
        margin: 5,
        background: "linear-gradient(45deg, #005DA4, #0078D4)",
        WebkitBackgroundClip: "text",
        color: "transparent",
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "15px",
    },
    button: {
        fontFamily: "Montserrat, sans-serif",
        borderRadius: "12px",
        textTransform: "none",
        fontSize: "12px",
    },
};

export const gradientMapping = {
    darkPrimary: 'linear-gradient(45deg, #005DA4, #0078D4)', 
    primary: 'linear-gradient(45deg, #1976d2, #42a5f5)', 
    secondary: 'linear-gradient(45deg, #dc004e, #f73378)', 
    error: 'linear-gradient(45deg, #d32f2f, #f44336)', 
    warning: 'linear-gradient(45deg, #f57c00, #ff9800)', 
    info: 'linear-gradient(45deg, #0288d1, #03a9f4)',
    success: 'linear-gradient(45deg, #388e3c, #4caf50)', 
};