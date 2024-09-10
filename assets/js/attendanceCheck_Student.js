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

            for (const checkStudent of data) {
                let row = `
                <tr>
                    <th scope="row">${checkStudent._id}</th>
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
        put(`http://localhost:3000/attendanceCheck_Student/update/${attendanceId}`, updates)
            .then(response => {
                console.log(response)
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
            renderData(data._attendanceCheckDto._id)


            document.getElementById("gradeName").innerHTML= data._attendanceCheckDto._gradeName
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

window.onload = function () {
    // renderData();
    renderAttendanceCheckStastic(id);
    document.querySelector('#confirmSave').addEventListener('click', updateAttendance);
};
