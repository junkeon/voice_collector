
import { React, useRef, useEffect, useState } from "react";
import { Grid, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MicIcon from '@material-ui/icons/Mic';

import { useReactMediaRecorder } from "react-media-recorder";
import WaveSurfer from "wavesurfer.js";

import levenshtein from 'js-levenshtein'

function Record({ recipeUrl, classes, sentList, setSentList, index, setIndex, user }) {

    const media = useReactMediaRecorder({ audio: true, onStop: (a, b) => { setblob(b) } })
    const [text, setText] = useState('')
    const [recBtn, setRecBtn] = useState(true)

    const waveformRef = useRef();
    const recMain = useRef();
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
            blobToBase64_asr(recipeUrl, blob);
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
            const target = sentList[index].text.replace(/[^가-힣]/g, '')
            const pred = text.replace(/[^가-힣]/g, '')
            const dist = levenshtein(target, pred)
            const score = Math.round(1000 - dist / target.length * 1000) / 10

            console.log(`${target} ${pred} ${dist} ${score}`)
            const check = window.confirm(`문장 읽기 점수 : ${score}\n다음으로 넘어가시겠습니까?`)
            if (check) {
                setSentList(sentList.map(item => item.id === index ? { ...item, done: true } : item))
                changeSent('+')
                blobToBase64_res(recipeUrl, blob, text, score)
            }
            setText('')
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

    function blobToBase64_asr(recipeUrl, blob) {
        console.log('Connect to server... asr')
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            sendToOffline(base64);
        };
        reader.readAsDataURL(blob);
    };

    function blobToBase64_res(recipeUrl, blob, text, score) {
        console.log('Connect to server... result')
        var reader = new FileReader();
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            sentAudio(recipeUrl, base64, index, user, sentList[index].text, text, score)
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

    function sentAudio(recipeUrl, b64data, index, user, scp, asr, score) {
        const postBody = {
            'user': user,
            'blob': b64data,
            'index': index,
            'sent': scp,
            'asr' : asr,
            'score' : score
        }
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(recipeUrl + '/send_audio', requestMetadata)
            .then(res => res.json())
    }

    function record() {
        if (recBtn) {
            media.startRecording();
            setIconColor('secondary');
            setStatusMSG('Recording...')
            setStatusVis('block')
            setWavVis('none')
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
        <div className={classes.content}
            ref={recMain}
            tabIndex={0}
            onKeyDown={
                e => {
                    if(e.key === 'ArrowLeft'){
                        changeSent('-')
                    } else if(e.key === 'ArrowRight'){
                        changeSent('+')
                    // } else if(e.key === ' '){
                    //     record()
                    }
                }}>
            <div className={classes.index}>
                <Typography variant="h5">
                    {sentList[index].done ? <span style={{color:"#1232ff"}}>Done - </span> : ''}   
                    {index + 1} / {totalNumber}
                </Typography>
            </div>
            <div className={classes.parSentence}>
                <div className={classes.sentence}>
                    {sentList[index].text.split('\n').map((line, idx) => {
                        return <Typography key={idx} variant="h4" style={{ paddingTop: 7, paddingBottom: 7 }}>{line}</Typography>
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