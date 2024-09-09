import { get, formatDateTime, post } from "../js/api.js";

function renderAttendanceCheck() {
    get('http://localhost:3000/attendanceCheck/showAll')
        .then(data => {
            const tableData = document.getElementById('listTable');
            tableData.innerHTML = '';
            console.log('data', data);
            for (const attend of data) {
                const createdAtDate = new Date(attend._createdAt);
                let row = `
                    <tr>
                      <td>${attend._id}</td>
                      <td>${attend._gradeName}</td>
                      <td>${formatDateTime(createdAtDate)}</td>
                      <td>${attend._section}</td>
                      <td>
                        <a href="../attendance/detail_attendance.html" type="button" class="btn btn-secondary">Chi tiết</a>
                      </td>
                    </tr>`;
                tableData.innerHTML += row;
            }
        })
        .catch(error => {
            console.error("Error fetching attendance check:", error);
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
            console.error("Error fetching grades:", error);
        });
}

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
            console.log('reponse:', reponse);
            window.location.href='http://localhost:63342/project/pages/attendance/list_attendance.html'
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Thêm điểm danh thất bại.');
        });
}


window.onload = function() {
    renderAttendanceCheck();
    renderGrade();
    document.getElementById('createAttendanceBtn').addEventListener('click', createAttendanceCheck);
};
