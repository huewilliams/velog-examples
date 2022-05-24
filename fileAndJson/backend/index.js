const express = require('express');
const fs = require('fs');
const cors = require('cors');
const fileRouter = require('./routes/file');

const app = express();

app.use(cors());

app.use('/file', fileRouter);

app.listen(4000, () => {
    // 파일이 저장될 upload 디렉토리가 없으면 생성
    const dir = './upload';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    
    console.log('server is running!');
});
