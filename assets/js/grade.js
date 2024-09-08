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
          <td>${grade.id}</td>
          <td>${grade.code}</td>
          <td>${grade.name}</td>
          <td>
                <a href="../pages/student/student_class.html?grade_id=${grade.id}&grade_name=${grade.name}" type="button" class="btn btn-primary">Xem</a>
          </td>
        </tr>`
          tableData.innerHTML += row;
        }
    });
}
window.onload = renderGrade;