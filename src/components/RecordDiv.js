
import { React, useRef, useEffect, useState } from "react";
import { Grid, IconButton, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MicIcon from '@material-ui/icons/Mic';

import { useReactMediaRecorder } from "react-media-recorder";
import WaveSurfer from "wavesurfer.js";

function Record({ classes }) {

    const media = useReactMediaRecorder({ audio: true, onStop: (a, b) => { blobToBase64(b); setURL(b) } })
    const [text, setText] = useState('')
    const [recBtn, setRecBtn] = useState(true)

    const waveformRef = useRef();
    const [url, setURL] = useState('');

    const [decBtnState, setDecState] = useState({ 'color': 'disabled', 'disabled': true })
    const [iconColor, setIconColor] = useState('action')
    const [incBtnState, setIncState] = useState({ 'color': 'inherit', 'disabled': false })

    const [statusMSG, setStatusMSG] = useState("Ready to record")
    const [statusVis, setStatusVis] = useState('block')
    const [waveVis, setWavVis] = useState('none')

    const [index, setIndex] = useState(0)
    const sentList = [
        '섀도우 헌터스 원 뼈의 도시는 \n카산드라 클레어의 소설로,\n 섀도우 헌터스 시리즈의 첫 작품이다.',
        '네이버 웹툰에서 연재하고 있는 \n상하 작가의 웹툰이며,\n 네이버 수요일 웹툰 이위를 한 \n인기 웹툰이기도 하다.',
        '저도 얘기만 들었지, \n직접 와보기는 처음이네요,\n 듣던 대로 구경할 게 \n정말 많네요.',
        '한 사람 더 왔다고 아까 얘기했어요,\n 술잔이랑 앞접시 좀 빨리 주세요.',
        '술 못 마신다는 얘긴 못 들었는데,\n 왜 못 먹는 거야?',
        '말 꺼내기 쉽지 않은 걸 보니,\n 한잔하면서 툭 터놓고 얘기할까?',
        '가산디지털단지 차 막히는 거야 \n하루 이틀 얘긴가요, \n상관없으니까 안전하게 가주세요.',
        '너무 예쁘다, 고맙다 얘들아.',
        '템플스테이 다녀온 얘기 좀 해봐요, 재밌었어요?',
    ]
    const totalNumber = sentList.length

    useEffect(() => {
        if (waveformRef.current && url !== '') {
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: 'blue',
                barWidth: 2,
                barMinHeight: 1,
                cursorColor: 'transparent',
                progressColor: 'blue',
                // scrollParent:true
            });

            wavesurfer.loadBlob(url);

            return () => {
                wavesurfer.destroy()
            }
        }
    }, [url]);

    useEffect(() => {
        if (text !== '') {
            var check = window.confirm('음성 인식 결과 : \n' + text)
            if (check) {
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
        } else {
            media.stopRecording();
            setIconColor('action');
            setStatusMSG('Ready to record')
            setStatusVis('none')
            setWavVis('block')
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
    }

    return (
        <div className={classes.content}>
            <div className={classes.index}>
                <Typography variant="h5">{index + 1} / {totalNumber}</Typography>
            </div>
            <div className={classes.parSentence}>
                <div className={classes.sentence}>
                    {/* <Typography variant="h4">간장 공장 공장장은 장 공장장이고,</Typography>
                    <Typography variant="h4">된장 공장 공장장은 간 공장장이다.</Typography> */}
                    {sentList[index].split('\n').map((line, idx) => { return <Typography key={idx} variant="h4">{line}</Typography> })}
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