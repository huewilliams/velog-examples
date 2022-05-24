const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    // 업로드 대상 디렉토리 지정
    destination(req, file, cb) {
        cb(null, 'upload')
    },
    // 폴더에 저장될 파일명
    filename(req, file, cb) {
        cb(null,  Date.now() + '-' + file.originalname)
    }
});ㄴ

const upload = multer({ storage: storage });

const router = express.Router();

// upload.singe(fieldname), fieldname은 폼에 정의된 필드명
router.post('/upload', upload.single('file'), (req, res) => {
    res.status(201).json({message: 'file upload success!'});
})

module.exports = router;