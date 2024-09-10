import { get, formatDate } from "../js/api.js";

function renderAttendanceCheck() {
    get('http://localhost:3000/attendanceCheckStatics/showAll')
        .then(data => {
            const tableData = document.getElementById('listTable');
            tableData.innerHTML = '';
            console.log('data', data);
            for (const attend of data) {
                const createdAtDate = new Date(attend._attendanceCheckDto._createdAt);
                let row = `
                    <tr>
                      <td>${attend._id}</td>
                      <td>${attend._attendanceCheckDto._gradeName}</td>
                      <td>${formatDate(createdAtDate)}</td>
                      <td>${attend._attendanceCheckDto._section}</td>
                      <td>${attend._totalStudents}</td>
                      <td>${attend._present}</td>
                      <td>${attend._excused}</td>
                      <td>${attend._unexcused}</td>
                      <td>${attend._late}</td>
                      <td>
                        <a href="../attendance/detail_attendance.html?id=${attend._id}" type="button" class="btn btn-secondary">Chi tiết</a>
                      </td>
                    </tr>`;
                tableData.innerHTML += row;
            }
        })
        .catch(error => {
            console.error("Error fetching attendance check:", error);
        });
}

window.onload = function() {
    renderAttendanceCheck();
};
