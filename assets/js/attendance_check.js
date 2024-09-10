import { get, formatDateTime, post } from "../js/api.js";

function createAttendanceCheck() {
    const section = document.getElementById('section').value;
    const gradeId = document.getElementById('grade').value;

    const data = {
        createdAt: new Date().toISOString(),
        section: section,
        gradeId: parseInt(gradeId, 10)
    };

    post(`http://localhost:3000/created/attendance/${gradeId}`, data)
        .then(reponse => {
            window.location.href='./list_attendance.html'
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Thêm điểm danh thất bại.');
        });
}

window.onload = function() {
    document.getElementById('createAttendanceBtn').addEventListener('click', createAttendanceCheck);
};
