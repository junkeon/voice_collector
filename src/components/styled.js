import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    position: 'absolute',
    top: "40%",
    left: "50%",
    transform: "translateY(-40%) translateX(-50%)",

    width: 600,
    height: 600,
    borderRadius: 10,
    backgroundColor: '#fcfdfc',
  },
  appbar: {
    position: 'relative',
    alignItems: 'center',
    width:600,
  },
  toolbar: {
    height: 80,
  },
  barTitle: {
    marginLeft:100,
    marginRight:100,
  },
  cardContent: {
    position:"absolute",
    left:0,
    right:0,
    top:80,
    padding: 0
  },
  content: {
    position: "relative",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    height: 340,
  },
  index: {
    paddingRight: 0,
    paddingTop: 0,
    textAlign: "right",
    color: "#757381",    
  },
  parSentence: {
    height: 160,
    borderTop: "5px solid #757381",
    borderBottom: "5px solid #757381",
    marginTop: 10,
  },
  sentence: {
    position: 'relative',
    textAlign: "center",
    width: "100%",
    top: "50%",
    transform: "translateY(-50%)",
  },
  visual: {
    position: 'relative',
    textAlign: "center",
    height: 130,
    marginTop: 10,
    // backgroundColor:'#334455'
  },
  status: {
    position: 'relative',
    width: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#737373"

  },
  waveform : {

  },
  control: {
    marginTop: 30,
    height: 60,
    flexGrow: 1,

  },
  grid: {
    position: 'relative',
    alignItems: 'center',
    textAlign: 'center'
  },
  controlBtn: {
    color: "#757381"
  }
});

export default useStyles