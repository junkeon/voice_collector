import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Grid, IconButton, Toolbar } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MicIcon from '@material-ui/icons/Mic';

const useStyles = makeStyles({
  card: {
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)",

    width: 600,
    height: 600,
    borderRadius: 10,
    backgroundColor: '#fcfdfc',
  },
  appbar: {
    position: 'static',
  },
  toolbar: {
    height: 80,
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  cardContent: {
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
    paddingRight: 20,
    paddingTop: 20,
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
    height: 100,
    marginTop: 10,
  },
  status: {
    position: 'relative',
    width: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#737373"
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
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <AppBar className={classes.appbar} elevation={0} >
        <Toolbar className={classes.toolbar}>
          <IconButton color="inherit" aria-label="List">
            <ListIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Voice Collector
          </Typography>
          <IconButton color="inherit" aria-label="Setting">
            <SettingsIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CardContent className={classes.cardContent}>
        <div className={classes.content}>
          <div className={classes.index}>
            <Typography variant="h6">015 / 300</Typography>
          </div>
          <div className={classes.parSentence}>
            <div className={classes.sentence}>
              <Typography variant="h4">간장공장 공장장은 장 공장장이고,</Typography>
              <Typography variant="h4">된장 공장 공장장은 간 공장장이다.</Typography>
            </div>
          </div>
          <div className={classes.visual}>
            <div className={classes.status}>
              <Typography variant="h4">Ready to record</Typography>
            </div>
            <div></div>
          </div>
          <div className={classes.control}>
            <Grid container spacing={2}>
              <Grid item xs className={classes.grid}>
                <IconButton><ArrowBackIosIcon fontSize="large" style={{ color: "#757381" }} /></IconButton>
              </Grid>
              <Grid item xs className={classes.grid}>
                <IconButton><MicIcon fontSize="large" style={{ color: "#757381" }} /></IconButton>
              </Grid>
              <Grid item xs className={classes.grid}>
                <IconButton><ArrowForwardIosIcon fontSize="large" style={{ color: "#757381" }} /></IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}