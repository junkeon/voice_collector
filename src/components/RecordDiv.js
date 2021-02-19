
import { React, useRef, useEffect, useState } from "react";
import { Grid, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MicIcon from '@material-ui/icons/Mic';

import { useReactMediaRecorder } from "react-media-recorder";
import WaveSurfer from "wavesurfer.js";

function Record({ classes, sentList, setSentList, index, setIndex }) {

    const media = useReactMediaRecorder({ audio: true, onStop: (a, b) => { setblob(b) } })
    const [text, setText] = useState('')
    const [recBtn, setRecBtn] = useState(true)

    const waveformRef = useRef();
    const [blob, setblob] = useState('');

    const [decBtnState, setDecState] = useState({ 'color': 'disabled', 'disabled': true })
    const [iconColor, setIconColor] = useState('action')
    const [incBtnState, setIncState] = useState({ 'color': 'inherit', 'disabled': false })

    const [statusMSG, setStatusMSG] = useState("Ready to record")
    const [statusVis, setStatusVis] = useState('block')
    const [waveVis, setWavVis] = useState('none')

    const totalNumber = sentList.length

    useEffect(() => {
        if (waveformRef.current && blob !== '') {
            blobToBase64(blob);
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: 'blue',
                barWidth: 2,
                barMinHeight: 1,
                cursorColor: 'transparent',
                progressColor: 'blue',
                // scrollParent:true
            });

            wavesurfer.loadBlob(blob);

            return () => {
                wavesurfer.destroy()
            }
        }
    }, [blob]);

    useEffect(() => {
        if (text !== '') {
            var check = window.confirm('음성 인식 결과 : \n' + text)
            if (check) {
                setSentList(sentList.map(item => item.id === index ? { ...item, done: true } : item))
                changeSent('+')
            }
        }
        setStatusMSG("Ready to record")
        setStatusVis('block')
        setWavVis('none')
    }, [text])

    useEffect(() => {
        if (index === 0) {
            setDecState({ 'color': 'disabled', 'state': true })
        } else {
            setDecState({ 'color': 'inherit', 'state': false })
        }

        if (index === sentList.length - 1) {
            setIncState({ 'color': 'disabled', 'state': true })
        } else {
            setIncState({ 'color': 'inherit', 'state': false })
        }
    }, [index])

    function blobToBase64(blob) {
        console.log('Connect to server...')
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            sendToOffline(base64);
        };
        reader.readAsDataURL(blob);
    };

    function sendToOffline(b64data) {
        const recipeUrl = "https://ai-demo.tmaxos.com/xwpqe/restasr/"
        const postBody = {
            'uuid': 'restasr',
            'data': b64data
        }
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(recipeUrl, requestMetadata).then(res => res.json()).then(res => setText(res.text))
    }

    function record() {
        if (recBtn) {
            media.startRecording();
            setIconColor('secondary');
            setStatusMSG('Recording...')
            setDecState({ 'color': 'disabled', 'state': true })
            setIncState({ 'color': 'disabled', 'state': true })
        } else {
            media.stopRecording();
            setIconColor('action');
            setStatusMSG('Ready to record')
            setStatusVis('none')
            setWavVis('block')
            if (index === 0) {
                setDecState({ 'color': 'disabled', 'state': true })
            } else {
                setDecState({ 'color': 'inherit', 'state': false })
            }

            if (index === sentList.length - 1) {
                setIncState({ 'color': 'disabled', 'state': true })
            } else {
                setIncState({ 'color': 'inherit', 'state': false })
            }


        }
        setRecBtn(!recBtn);
    }

    function changeSent(direc) {
        if (direc === '+') {
            if (index < sentList.length - 1) {
                setIndex(index + 1)
            }
        } else if (direc === '-') {
            if (index > 0) {
                setIndex(index - 1)
            }
        }
        setIconColor('action');
        setStatusMSG('Ready to record')
        setStatusVis('block')
        setWavVis('none')
    }

    return (
        <div className={classes.content}>
            <div className={classes.index}>
                <Typography variant="h5">
                    {sentList[index].done ? 'Done - ' : 'Undone - '}
                    {index + 1} / {totalNumber}
                </Typography>
            </div>
            <div className={classes.parSentence}>
                <div className={classes.sentence}>
                    {sentList[index].text.split('\n').map((line, idx) => {
                        return <Typography key={idx} variant="h4" style={{paddingTop:7, paddingBottom : 7}}>{line}</Typography>
                    })}
                </div>
            </div>
            <div className={classes.visual}>
                <div className={classes.status} style={{ display: statusVis }}>
                    <Typography variant="h4">{statusMSG}</Typography>
                </div>
                <div ref={waveformRef} className={classes.waveform} style={{ display: waveVis }}></div>
            </div>
            <div className={classes.control}>
                <Grid container spacing={2}>
                    <Grid item xs className={classes.grid}>
                        <IconButton
                            onClick={() => { changeSent('-') }}
                            disabled={decBtnState['state']}>
                            <ChevronLeftIcon
                                fontSize="large"
                                className={classes.controlBtn}
                                color={decBtnState['color']} />
                        </IconButton>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <IconButton onClick={record}><MicIcon fontSize="large" className={classes.controlBtn} color={iconColor} /></IconButton>
                    </Grid>
                    <Grid item xs className={classes.grid}>
                        <IconButton
                            onClick={() => { changeSent('+') }}
                            disabled={incBtnState['state']}>
                            <ChevronRightIcon
                                fontSize="large"
                                className={classes.controlBtn}
                                color={incBtnState['color']} />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}

export default Record