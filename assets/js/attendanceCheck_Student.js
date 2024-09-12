
import {formatDateTime, get, put} from "../js/api.js";

const urlParams = new URLSearchParams(window.location.search);
let id = JSON.parse(urlParams.get("id"))

function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function renderData(attendanceId) {
    get(`http://localhost:3000/attendanceCheck_Student/showAll/${attendanceId}`)
        .then(data => {
            const tableData = document.getElementById('listTable');
            tableData.innerHTML = '';
            let index = 1;
            for (const checkStudent of data) {
                let row = `
                <tr>
                    <th scope="row">${index}</th>
                    <td>${checkStudent._stundentDto._name}</td>
                    <td>${checkStudent._stundentDto._dob}</td>
                    <td>${checkStudent._stundentDto._gender}</td>
                     <td hidden="hidden">${checkStudent._stundentDto._id}</td>
                     <td hidden="hidden">${checkStudent._attendanceCheckId}</td>
                    <td>
                        <select class="form-control" id="status-${checkStudent._id}" name="status">
                            <option ${checkStudent._status === '' ? 'selected' : ''}></option>
                            <option ${checkStudent._status === 'Có mặt' ? 'selected' : ''}>Có mặt</option>
                            <option ${checkStudent._status === 'Có phép' ? 'selected' : ''}>Có phép</option>
                            <option ${checkStudent._status === 'Muộn' ? 'selected' : ''}>Muộn</option>
                            <option ${checkStudent._status === 'Không phép' ? 'selected' : ''}>Không phép</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" class="form-control" id="description-${checkStudent._id}" value="${checkStudent._description || ''}">
                    </td>
                </tr>`;
                tableData.innerHTML += row;
                index++;
            }
        })
        .catch(error => {
            console.error('Error fetching attendance details:', error);
        });
}

function updateAttendance() {
    const rows = document.querySelectorAll('#listTable tr');
    const updates = [];

    rows.forEach(row => {
        const id = row.querySelector('th').textContent;
        const status = row.querySelector(`#status-${id}`).value;
        const description = row.querySelector(`#description-${id}`).value;
        const studentId = parseInt(row.querySelector('td:nth-child(5)').textContent.trim(), 10);
        const attendanceCheckId = parseInt(row.querySelector('td:nth-child(6)').textContent.trim(), 10);
        updates.push({
            id: parseInt(id, 10),
            status: status,
            description: description,
            studentId: studentId,
            attendanceCheckId: attendanceCheckId
        });
    });
    const confirms = confirm('Xác nhận lưu?');
    if (confirms) {
        let attendanceId = parseInt(document.getElementById("attendId").value)
        put(`http://localhost:3000/attendanceCheck_Student/update/${attendanceId}`, updates)
            .then(response => {
                alert('Lưu thành công!');
            })
            .catch(error => {
                console.error('Error updating attendance details:', error);
            });
    }else {
        alert('Xác nhận bị huỷ')
    }
}

function renderAttendanceCheckStastic(id) {
    get(`http://localhost:3000/attendanceCheckStatics/findById/${id}`)
        .then(data => {
            const tableData = document.getElementById('listTable');
            tableData.innerHTML = '';
            document.getElementById("attendId").value = data._attendanceCheckDto._id
            renderData(data._attendanceCheckDto._id)


            document.getElementById("gradeName").innerHTML= data._attendanceCheckDto._gradeName
            document.getElementById("section").innerHTML= data._attendanceCheckDto._section
            document.getElementById("createdAt").innerHTML= data._attendanceCheckDto._createdAt
            document.getElementById("present-count").innerHTML= data._present
            document.getElementById("excused-count").innerHTML= data._excused
            document.getElementById("late-count").innerHTML= data._late
            document.getElementById("absent-count").innerHTML= data._unexcused
            document.getElementById("total-students").innerHTML= data._totalStudents
        })
        .catch(error => {
            console.error("Error fetching attendance check:", error);
        });
}

function exportToExcel() {
    const attendanceId = document.getElementById("attendId").value;
    if (!attendanceId) {
        alert('Không tìm thấy mã điểm danh.');
        return;
    }
    const confirms = confirm('Xác nhận tải xuống?');
    if (confirms) {
        fetch(`http://localhost:3000/export-students/${attendanceId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Lỗi khi tải file');
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `attendance_${attendanceId}.xlsx`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Lỗi khi xuất dữ liệu:', error);
                alert('Có lỗi xảy ra khi xuất dữ liệu.');
            });
    }else {
        alert('Xác nhận bị huỷ')
    }

}

window.onload = function () {
    renderAttendanceCheckStastic(id);
    document.querySelector('#confirmSave').addEventListener('click', updateAttendance);
    document.querySelector('#exportExcelButton').addEventListener('click', exportToExcel);
};
