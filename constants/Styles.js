import { Dimensions } from "react-native"

export default {


  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },

  containerCenteredView: {
    flex: 1,
    justifyContent: 'center',
  },

  loginScreenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:"#000000"
  },

  googleButton: {
    backgroundColor: "transparent",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, .2)",
  },

  buttonIcon: {
    fontSize:20,
    position:"absolute",
    left:21,
    top:10,
    color: "#fff",
  },

  buttonText: {
    letterSpacing: 0.3,
    fontSize: 11,
    color: "#fff",
    textTransform:"uppercase",
  },

  container: {
    flex: 1,
  },

  listHeaderItemBackgroundImage: {
    backgroundColor: 'transparent',
    width: '100%',
    height: Dimensions.get('window').height*0.8,
  },

  listItemBackgroundImage: {
    backgroundColor: 'rgba(0,0,0,.6)',
    width: '100%',
    height: 400,
  },

  overlay: {
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    top:0
  },

  overlaySmall:{
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    top:50
  },

  listItemElementsContainer: {
    flex: 1,
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    alignItems: 'stretch',
    fontFamily:"plain",
  },


  bookButton: {
    backgroundColor: "#000000",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },

  buttonSubmit: {
    backgroundColor: "#000000",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },

  liveButton: {
    backgroundColor: "#000000",
    borderColor: "#EC340C",
    borderWidth: 1,
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22
  },

  containerSearchView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff"
  },

  containerRateView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff"
  }

};

