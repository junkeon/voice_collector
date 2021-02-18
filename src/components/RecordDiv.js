import React from 'react';

import { Grid, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MicIcon from '@material-ui/icons/Mic';

function Record({ classes }) {
    return (
        <div className={classes.content}>
            <div className={classes.index}>
                <Typography variant="h5">015 / 300</Typography>
            </div>
            <div className={classes.parSentence}>
                <div className={classes.sentence}>
                    <Typography variant="h4">간장 공장 공장장은 장 공장장이고,</Typography>
                    <Typography variant="h4">된장 공장 공장장은 간 공장장이다.</Typography>
                </div>
            </div>
            <div className={classes.visual}>
                <div className={classes.status}>
                    <Typography variant="h4">Ready to record</Typography>
                </div>
                <div className={classes.waveform}></div>
            </div>
            <div className={classes.control}>
                <Grid container spacing={2}>
                    <Grid item xs className={classes.grid}>
                        <IconButton><ChevronLeftIcon fontSize="large" classes={classes.controlBtn} /></IconButton>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <IconButton><MicIcon fontSize="large" classes={classes.controlBtn} /></IconButton>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <IconButton><ChevronRightIcon fontSize="large" classes={classes.controlBtn} /></IconButton>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Record