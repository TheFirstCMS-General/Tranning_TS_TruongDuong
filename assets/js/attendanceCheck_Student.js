import {get, formatDateTime} from "../js/api.js";

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

            for (const checkStudent of data) {
                let row = `   <tr>
              <th scope="row">${checkStudent._id}</th>
              <td>${checkStudent._stundentDto._name}</td>
              <td>${checkStudent._stundentDto._dob}</td>
              <td>${checkStudent._stundentDto._gender}</td>
              <td>
                <select class="form-control" id="gender" name="gender" >
                    <option>${checkStudent._status}</option>
                    <option>Có mặt</option>
                    <option>Có phép</option>
                    <option>Muộn</option>
                    <option>Không phép</option>
                  </select>
              </td>
              <td>
                <input type="text" class="form-control" value="${checkStudent._description || ''}">
              </td>
        
            </tr>`
                tableData.innerHTML += row;
            }
        })
        .catch(error => {
            console.error('Error fetching attendance details:', error);
        });
}

window.onload = function () {
    renderData();
};
