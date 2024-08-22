const fs = require('fs');
const ExcelJS = require('exceljs');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Data');

// 엑셀 파일 생성 함수 선언
async function saveToExcel() {
    const filename = "data.xlsx";
    
    // 파일 중복 생성을 막기 위한 조건문 
    if (!fs.existsSync(filename))
    {
        const mergeRange = 'A1:D1';
        // 셀 병합 시도 전에 병합 여부를 확인합니다

        sheet.mergeCells(mergeRange);

        // 데이터 삽입
        sheet.getCell('A1').value = `Date: ${new Date().toLocaleString()}`;

        // 날짜와 시간 셀의 정렬 설정 (가운데 정렬 & 굵은 글씨)
        sheet.getCell('A1').alignment = { horizontal: 'center' };
        sheet.getCell('A1').font = { bold: true };

        try {
            // data.xlsx 이름의 엑셀파일 생성
            await workbook.xlsx.writeFile(filename);
            return filename;
        } catch (err) {
            console.error("Can't create Excel file:", err);
            throw err; // 에러를 호출 측으로 전파합니다
        }
    }
    else
    {
        return filename;
    }

}

// 엑셀 저장 요청 확인 시 엑셀 저장 및 파일명 전달
app.post('/save-file', async (req, res) => {
    try {
        const fileName = await saveToExcel();
        res.status(200).json({ filename: fileName }); // json파일에 파일이름 전달
    } catch (err) {
        console.error('Error in /save-file route:', err);
        res.status(500).send('Error collecting or saving data.');
    }
});

// 다운로드 요청 시 엑셀파일 전달
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;

    if (fs.existsSync(filename)) {
        res.download(filename, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).send('Error downloading file');
            }
        });
    } else {
        console.error('File does not exist:', filename);
        res.status(404).send('File not found');
    }
});

// 포트 4000번을 사용한 서버 구축
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
