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

function renderGrade() {
    get('http://localhost:3000/grade/showAll')
        .then(data => {
            console.log('data grade', data);
            const selectData = document.getElementById('grade');
            selectData.innerHTML = '';
            for (const grade of data) {
                let options = `
                <option value="${grade._id}">${grade._name}</option>
                `;
                selectData.innerHTML += options;
            }
        })
        .catch(error => {
            console.error(error);
        });
}
window.onload = function() {
    renderGrade()
    document.getElementById('createAttendanceBtn').addEventListener('click', createAttendanceCheck);
};
