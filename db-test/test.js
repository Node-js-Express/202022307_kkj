const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const app = express();

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// MongoDB 모델 정의
const Task = mongoose.model('Task', {
    name: String,
});

// 서버 시작 전 초기 데이터 추가
const initializeData = async () => {
    try {
        // 이미 존재하는 데이터가 있는지 확인
        const existingData = await Task.findOne({ name: 'Test Monogo' });

        // 이미 데이터가 있는 경우 초기화하지 않음
        if (!existingData) {
            const task = new Task({ name: 'Test Monogo' });
            await task.save();
            console.log('저장됨');
        } else {
            console.log('이미있음');
        }
    } catch (error) {
        console.error(error);
    }
};

// 서버 시작
const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);

    // 서버 시작 시 초기 데이터 추가
    initializeData();
});