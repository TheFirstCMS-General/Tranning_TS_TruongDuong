import {
    get
} from "../js/api.js"

function renderGrade(){
    get('http://localhost:3000/grade/showAll').
    then(data => {
        const tableData = document.getElementById('listTable');
        tableData.innerHTML = ''; 
        for (const grade of data) {
          let row =`<tr>
          <td>${grade._id}</td>
          <td>${grade._code}</td>
          <td>${grade._name}</td>
          <td>
                <a href="../pages/student/student_class.html?grade_id=${grade._id}&grade_name=${grade._name}" type="button" class="btn btn-primary">Xem</a>
          </td>
        </tr>`
          tableData.innerHTML += row;
        }
    });
}
window.onload = renderGrade;