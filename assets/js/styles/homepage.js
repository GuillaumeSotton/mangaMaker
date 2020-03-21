export const homepage = () => {
  return ({
      center : {
        display: "block",
        textAlign: "center",
      },

      hovereffect : {
        width:"100%",
        maxWidth: "400px",
        cursor:"default",
        "&:hover":{
          MsTransform:"scale(1.1)",
          WebkitTransform:"scale(1.1)",
          transform:"scale(1.1)",
          WebkitTransition: "all 0.20s",
          transition: "all 0.20s",
          cursor: "pointer"
        },
      }
  });
};
