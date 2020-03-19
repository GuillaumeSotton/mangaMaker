export const homepage = () => {
  return ({
      center : {
        display: "block",
        MarginLeft: "auto",
        MarginRight: "auto",
      },

      hovereffect : {
        width:"75%",
        cursor:"default",
        "&:hover":{
          MsTransform:"scale(1.1)",
          WebkitTransform:"scale(1.1)",
          transform:"scale(1.1)",
          WebkitTransition: "all 0.20s",
          transition: "all 0.20s",
        },
      }
  });
};
