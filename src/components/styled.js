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
    marginTop: 20,
    height: 340,
  },
  index: {
    paddingRight: 0,
    paddingTop: 0,
    textAlign: "right",
    color: "#757381",    
  },
  parSentence: {
    height: 230,
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
    // position: 'relative',
    textAlign: "center",
    height: 120,
    // marginTop: 10,
  },
  status: {
    position: 'relative',
    width: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#737373"
  },
  waveform : {
    position: 'relative',
    width: "90%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",
    // backgroundColor: "#ffffff"
  },
  control: {
    marginTop: 10,
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
  },
  listContent: {
    position: "relative",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    height: 440,
    overflow: "auto",
  },
  subheader: {
    backgroundColor:'white',
    textAlign:'center',
    fontSize:30,
    color:'#363488',
  },
  loginContent: {
    position: "relative",
    marginLeft: 100,
    marginRight: 100,
    marginTop: 100,
    textAlign:"center",
  },
  loginInput: {
    display: "block",
    marginBottom: 30,
    width: "100%",
    height: 30,
    
    padding: 10,
    border: 'none',
    borderBottom: "1px solid #eaeaea",
    color: "#757575",

    '&:focus': {
      outline: "none"
    }
 }
});

export default useStyles