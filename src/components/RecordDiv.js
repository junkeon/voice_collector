
import { React, useRef, useEffect, useState } from "react";
import { Grid, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MicIcon from '@material-ui/icons/Mic';

import { useReactMediaRecorder } from "react-media-recorder";
import WaveSurfer from "wavesurfer.js";

function Record({ classes }) {    

    const sentList = [
        {id:0, text:'안녕하세요. 반갑습니다.', done:false}
    ]

    const index = 0

    return (
        <div className={classes.content}>
            <div className={classes.index}>
                <Typography variant="h5"> 015 / 300</Typography>
            </div>
            <div className={classes.parSentence}>
                <div className={classes.sentence}>
                    {sentList[index].text.split('\n').map((line, idx) => {
                        return <Typography key={idx} variant="h4" style={{ paddingTop: 7, paddingBottom: 7 }}>{line}</Typography>
                    })}
                </div>
            </div>
            <div className={classes.visual}>
                <div className={classes.status}>
                    <Typography variant="h4">Ready to record</Typography>
                </div>
                {/* <div ref={waveformRef} className={classes.waveform} style={{ display: waveVis }}></div> */}
            </div>
            <div className={classes.control}>
                <Grid container spacing={2}>
                    <Grid item xs className={classes.grid}>
                        <IconButton>
                            <ChevronLeftIcon
                                fontSize="large"
                                className={classes.controlBtn}/>
                        </IconButton>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <IconButton ><MicIcon fontSize="large" className={classes.controlBtn} /></IconButton>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <IconButton>
                            <ChevronRightIcon
                                fontSize="large"
                                className={classes.controlBtn}/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default Record