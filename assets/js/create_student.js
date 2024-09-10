import {
    get, put, formatDate
} from "../js/api.js"

const urlParams = new URLSearchParams(window.location.search);
let grade_id = JSON.parse(urlParams.get("grade_id"))
let grade_name = decodeURI(urlParams.get("grade_name"))


function renderStudent(){
    get(`http://localhost:3000/student/findStudentDonHaveGrade`)
        .then(data => {
            const tableData = document.getElementById('listTable');
            tableData.innerHTML = '';
            let count = 1
            for (const student of data) {
                let convertDate = new Date(student._dob);
                let row =` <tr>
              <th scope="row">${count}</th>
              <td>${student._name}</td>
              <td>${formatDate(convertDate)}</td>
              <td>${student._gender}</td>
              <td>${student._address}</td>
              <td>${student._phone}</td>
              <td style="text-align: center">
                 <input class="form-check-input" type="checkbox" data="${student._id}" id="defaultCheck1">
              </td>
            </tr>`
                count++
                tableData.innerHTML += row;
            }
            document.querySelector(".title").innerHTML = "lớp "+grade_name;
        });
}

function addStudent(){

    const form = document.querySelector("#listTable")

    const inputs = form.querySelectorAll('input[type="checkbox"]')
    for (const input of inputs) {
        if ( input.checked == true ) {
            let formValue = {
                grade_id: grade_id,
                id: parseInt(input.getAttribute("data"))
            }
            put(`http://localhost:3000/student/updateGradeForStudent`,formValue)
        }
    }
    window.location.href=`../student/student_class.html?grade_id=${grade_id}&grade_name=${grade_name}`
}

function checkbox(value){
    const form = document.querySelector("#listTable")

    const inputs = form.querySelectorAll('input[type="checkbox"]')
    for (const input of inputs) {
       input.checked = value
    }
}
document.querySelector('.createBtn').addEventListener('click', addStudent);
document.querySelector('.selectAllBtn').addEventListener('click', ()=>{checkbox(true)});
document.querySelector('.unSelectAllBtn').addEventListener('click', ()=>{checkbox(false)});


window.onload = renderStudent()