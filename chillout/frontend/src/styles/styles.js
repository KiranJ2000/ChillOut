import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    backgroundColor: "rgb(242, 242, 242)",
  },

  userList: {
    margin: "10px",
    color: "white",
    fontFamily: "Courier New, monospace",
  },

  borderHeader: {
    textAlign: "center",
  },

  heading: {
    fontFamily: "Courier New, monospace",
  },

  outerDiv: {
    border: "2px solid black",
    marginRight: "10px",
    width: "280px",
  },

  paper: {
    width: "250px",
    maxHeight: "400px",
    backgroundColor: "#323639",
    overflow: "auto",
    textAlign: "center",
    marginRight: "15px",
    marginBottom: "10px",
  },

  circle: {
    width: "10px",
    height: "10px",
    backgroundColor: "#62bd19",
    borderRadius: "50%",
    position: "relative",
    top: "25px",
    left: "39px",
  },

  "@global": {
    "*::-webkit-scrollbar": {
      width: "12px",
      backgroundColor: "transparent",
    },

    "*::-webkit-scrollbar-button": {
      display: "none",
      width: "0",
      height: "0",
    },

    "*::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
    },

    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#4a4d52",
      border: "2px solid #282a2d",
      borderRadius: "10px",
    },
  },
}));

export default useStyles;
