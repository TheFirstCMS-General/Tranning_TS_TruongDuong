"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IGradeServiceImpl_1 = __importDefault(require("../service/impl/IGradeServiceImpl"));
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { IGradeService } = require('../service/IGradeService');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const gradeService = new IGradeServiceImpl_1.default();
app.get('/grade/showAll', (req, res) => {
    try {
        const grades = gradeService.showAll();
        res.json(grades);
    }
    catch (error) {
        console.error('Error fetching grade data:', error);
        res.status(500).send('Lỗi khi đọc dữ liệu JSON');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
