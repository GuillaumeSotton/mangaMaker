export const homepage = () => {
  return ({
      hovereffect : {
        width:"80%",
        height:"80%",
        float:"left",
        overflow:"hidden",
        position:"relative",
        textAlign:"center",
        cursor:"default",
        "&:hover":{
          MsTransform:"scale(1.2)",
          WebkitTransform:"scale(1.2)",
          transform:"scale(1.2)",
        },
      },

      overlay : {
        width:"100%",
        height:"100%",
        position:"absolute",
        overflow:"hidden",
        top:"0",
        left:"0",
        opacity:"0",
        backgroundColor:"rgba(0,0,0,0.5)",
        WebkitTransition:"all .4s ease-in-out",
        transition:"all .4s ease-in-out",
        "&:hover":{
          opacity:"1",
          filter:"alpha(opacity=100)",
        },
      },

      img : {
        display:"block",
        position:"relative",
        WebkitTransition:"all .4s linear",
        transition:"all .4s linear",
      },
  });
};
