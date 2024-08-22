import React from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Addicon from '@mui/icons-material/Add';
import axios from 'axios'
import Filesaver from 'file-saver'

const FloatingBtn = () =>{

    const downloadFile = (filename) => {
        axios.get(`http://127.0.0.1:4000/download/${filename}`, {
            responseType: 'blob'
        }).then((response) => {
            Filesaver.saveAs(new Blob([response.data]), filename);
        }).catch((error) => {
            console.error('Error downloading file:', error);
        });
    };

    const Send_download = () => {
        axios.post("http://127.0.0.1:4000/save-file")
            .then((res) => {
                console.log('Server response:', res.data);
                // 파일 이름 전달 받기
                const { filename } = res.data;
                // 다운로드 요청을 보냅니다.
                console.log('Filename received:', filename);
                downloadFile(filename);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <Box
            sx={{
                position: 'fixed', //fixed를 통한 위치 고정 (스크롤 시에도 고정됨)
                // 절대 위치 설정 (화면 가운데 배치)
                top: '50%',
                left: '50%',
            }}
        >
            <Fab variant="extended" color="primary" onClick={Send_download}>
                <Addicon sx={{ mr: 1 }} />
                Excel 다운로드
            </Fab>
        </Box>
    );
}

export default FloatingBtn