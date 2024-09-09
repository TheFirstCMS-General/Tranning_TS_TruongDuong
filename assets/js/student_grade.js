import {
    get
} from "../js/api.js"

const urlParams = new URLSearchParams(window.location.search);
let grade_id = JSON.parse(urlParams.get("grade_id"))
let grade_name = decodeURI(urlParams.get("grade_name"))

function renderStudent(){
    get(`http://localhost:3000/student/showAll/${grade_id}`)
        .then(data => {
        const tableData = document.getElementById('listTable');
        tableData.innerHTML = '';
        let count = 1
        for (const student of data) {
            let row =` <tr>
              <th scope="row">${count}</th>
              <td>${student._name}</td>
              <td>${student._dob}</td>
              <td>${student._gender}</td>
              <td>${student._address}</td>
              <td>${student._phone}</td>
              <td>
                <a href="update_student.html" type="button" class="btn btn-secondary">Cập nhật</a>
                <button type="button" class="btn btn-danger">Xóa</button>
              </td>
            </tr>`
            count++
            tableData.innerHTML += row;
        }
        document.querySelector(".title").innerHTML = "lớp "+grade_name;
    });
}
document.querySelector(".redirectCreateStudent").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `./create_student.html?grade_id=${grade_id}&grade_name=${grade_name}`;
})

window.onload = renderStudent()