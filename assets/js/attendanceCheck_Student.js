import {get, put} from "../js/api.js";

function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const attendanceId = getParam('id');
console.log('id của attendanceCheck:', attendanceId);

function renderData() {
    get(`http://localhost:3000/attendanceCheck_Student/showAll/${attendanceId}`)
        .then(data => {
            console.log('Attendance details:', data);
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


window.onload = function () {
    renderData();
    document.querySelector('#confirmSave').addEventListener('click', updateAttendance);
};
