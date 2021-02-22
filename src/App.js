import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import useStyles from './components/styled'
import NavBar from './components/NavBar'
import Record from './components/RecordDiv'
import DisplayList from './components/DisplayList'
import Login from './components/Login'

export default function SimpleCard() {
  
  const classes = useStyles();

  const content1 = <Login classes={classes} />
  const content2 = <DisplayList classes={classes} />
  const content3 = <Record classes={classes}/>

  return (
    <>
      <Card className={classes.card}>
        <NavBar classes={classes} />
        <CardContent className={classes.cardContent}>
          {content3}
        </CardContent>
      </Card>
    </>
  );
}