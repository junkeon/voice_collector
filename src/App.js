import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import useStyles from './components/styled'
import NavBar from './components/NavBar'
import Record from './components/RecordDiv'

export default function SimpleCard() {
  const classes = useStyles();  
  
  return (
    <Card className={classes.card}>
      <NavBar classes={classes} />
      <CardContent className={classes.cardContent}>
        <Record classes={classes}/>
      </CardContent>
    </Card>
  );
}