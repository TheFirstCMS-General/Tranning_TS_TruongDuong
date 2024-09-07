function renderGrade(){
    get('http://localhost:3000/grade/showAll').
    then(data => {
        const tableData = document.getElementById('listTable');
        tableData.innerHTML = ''; 
        for (const grade in data) {
          let row = `  <tr>
          <td>${grade.code}</td>
          <td>${grade.name}</td>
          <td>
                <a href="../pages/student/student_class.html" type="button" class="btn btn-primary">Xem</a>
          </td>
        </tr>`
          tableData.innerHTML += row;
        }
    });
}
renderGrade()