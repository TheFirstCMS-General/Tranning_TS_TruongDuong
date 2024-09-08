import {
    get
} from "../js/api.js"

const urlParams = new URLSearchParams(window.location.search);
let grade_id = JSON.parse(urlParams.get("grade_id"))
let grade_name = decodeURI(urlParams.get("grade_name"))

function renderGrade(){
    get(`http://localhost:3000/student/showAll/${grade_id}`)
        .then(data => {
        const tableData = document.getElementById('listTable');
        tableData.innerHTML = '';
        for (const student of data) {
            let row =` <tr>
              <th scope="row">${student._id}</th>
              <td>${student._name}</td>
              <td>${student._dob}</td>
              <td>Nam</td>
              <td>Hà Nội</td>
              <td>0123456789</td>
              <td>
                <a href="update_student.html" type="button" class="btn btn-secondary">Cập nhật</a>
                <button type="button" class="btn btn-danger">Xóa</button>
              </td>
            </tr>`
            tableData.innerHTML += row;
        }
    });
}