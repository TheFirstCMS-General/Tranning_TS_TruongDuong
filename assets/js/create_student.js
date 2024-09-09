import {
    get
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
                let row =` <tr>
              <th scope="row">${count}</th>
              <td>${student._name}</td>
              <td>${student._dob}</td>
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
    let studentIdArr = []

    const form = document.querySelector("#listTable")

    const inputs = form.querySelectorAll('input[type="checkbox"]')
    for (const input of inputs) {
        if ( input.checked == true ) {
            studentIdArr.push(parseInt(input.getAttribute("data")));
        }
    }
}

function selectAll(){
    const form = document.querySelector("#listTable")

    const inputs = form.querySelectorAll('input[type="checkbox"]')
    for (const input of inputs) {
       input.checked == true
    }
    console.log("ac")
}

document.querySelector('.createBtn').addEventListener('click', addStudent);
document.querySelector('.selectAllBtn').addEventListener('click', selectAll);


window.onload = renderStudent()