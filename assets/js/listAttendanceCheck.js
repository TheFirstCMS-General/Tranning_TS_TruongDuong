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
function importExcel() {
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('http://localhost:3000/import_student', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Import successful:', data);
                    alert('Import thành công!');
                } else {
                    console.error('Error importing file:', await response.text());
                    alert('Có lỗi xảy ra khi import file.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi import file.');
            }
        }
    });
    fileInput.click();
}
document.getElementById("importExcel").addEventListener("click", importExcel);
window.onload = function() {
    renderAttendanceCheck();
};
