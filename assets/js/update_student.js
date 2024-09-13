import {
    get,
    formatDate, put
} from "../js/api.js"

const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');
const grade_name = decodeURIComponent(urlParams.get('grade_name'));

function formatDateToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getStudent(data) {
    let dob = new Date(data._dob)
    document.getElementById('fullname').value = data._name;
    document.getElementById('dob').value = formatDateToISO(dob);
    document.getElementById('gender').value = data._gender;
    document.getElementById('address').value = data._address;
    document.getElementById('phone').value = data._phone;
    document.getElementById('gradeId').value = data._grade_id;
}

function updateStudent() {
    const pareInt = parseInt(studentId.trim(),10)
    const updatedStudent = {
        id: pareInt,
        name: document.getElementById('fullname').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        grade_id: parseInt(document.getElementById('gradeId').value)
    };
    put(`http://localhost:3000/updateStudent/${studentId}`, updatedStudent)
        .then(data => {
            const gradeId = parseInt(data._grade_id)
            window.location.href=`./student_class.html?grade_id=${data.student.grade_id}&&grade_name=${encodeURI(grade_name)}`
        })
        .catch(error => {
            console.error(error);
        });

}
document.getElementById('updateStudent').addEventListener('click', (e) =>{
    e.preventDefault()
    updateStudent()
});
window.onload = function () {
    const studentId = urlParams.get('id');
    if (studentId) {
        get(`http://localhost:3000/student/findById/${studentId}`).then(data => {
            getStudent(data);
        })
            .catch(error => {
                console.error(error);
            });
    }

}
