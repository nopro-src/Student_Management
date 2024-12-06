let editingIndex = null; // Biến toàn cục để lưu vị trí đang chỉnh sửa môn học

// Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

// Hiển thị sinh viên cần quản lý môn học và điểm
if (studentId) {
    // Lấy danh sách sinh viên từ localStorage
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    // Tìm sinh viên theo ID
    let student = students.find(s => s.userId == studentId);

    if (student) {
        let tableContent = `<tr>
        <th>#</th>
        <th>Image</th>
        <th>Họ và tên</th>
        <th>Ngày sinh</th>
        <th>Email</th>
        <th>Điện thoại</th>
        <th>Password</th>
        <th>Lớp</th>
        <th>Quê quán</th>
        <th>Giới tính</th>
    </tr>`;
        tableContent += `<tr>
            <td> ${student.userId}</td>
            <td><img src="${student.image}" alt="Ảnh sinh viên" width="100" height="100"/></td>    
            <td> ${student.userName}</td>
            <td> ${student.userBirth}</td>
            <td>${student.emailAddress}</td>
            <td> ${student.phoneNumber}</td>
            <td> ${student.password}</td>
            <td> ${student.class}</td>
            <td> ${student.address}</td>
            <td>${student.gender === '2' ? 'Nữ' : 'Nam'}</td>
        </tr>`;
        // Hiển thị thông tin chi tiết sinh viên
        document.getElementById('student-detail').innerHTML = tableContent;
    } else {
        // Thông báo nếu không tìm thấy sinh viên
        document.getElementById('student-detail').innerHTML = '<p>Không tìm thấy sinh viên.</p>';
    }
} else {
    document.getElementById('student-detail').innerHTML = '<p>Không có ID sinh viên được cung cấp.</p>';
}

// Lưu điểm môn học
function save() {
    let subjectName = document.getElementById('subject').value;
    let subjectSoTc = parseInt(document.getElementById('soTc').value);
    let pointTx1 = parseFloat(document.getElementById('point_tx1').value);
    let pointTx2 = parseFloat(document.getElementById('point_tx2').value);
    let pointKt = parseFloat(document.getElementById('point_kt').value);

    // Kiểm tra và lấy ID sinh viên từ URL
    if (!studentId) {
        alert("Không tìm thấy ID sinh viên.");
        return;
    }

    // Lấy danh sách môn học và điểm của sinh viên hiện tại từ localStorage
    let key = `subjects:${studentId}`; // Khóa riêng cho từng sinh viên
    let subjects = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

    // Tạo đối tượng dữ liệu môn học và điểm
    let subjectData = {
        subjectId: editingIndex !== null ? subjects[editingIndex].subjectId : Math.ceil(Math.random() * 100000000), // Tạo subjectId mới nếu chưa có
        subjectName: subjectName,
        soTc: subjectSoTc,
        pointTx1: pointTx1,
        pointTx2: pointTx2,
        pointKt: pointKt,
        totalPoint: (pointTx1 + pointTx2 + pointKt) / 3  // Giả sử điểm tổng là trung bình của 3 loại điểm
    };

    // Nếu đang ở chế độ chỉnh sửa, thay thế môn học cũ
    if (editingIndex !== null) {
        subjects[editingIndex] = subjectData; // Thay thế bản ghi cũ
        editingIndex = null; // Reset lại chế độ chỉnh sửa
    } else {
        // Thêm môn học mới vào danh sách
        subjects.push(subjectData);
    }

    // Lưu danh sách môn học và điểm của sinh viên vào localStorage
    localStorage.setItem(key, JSON.stringify(subjects));

    // Hiển thị danh sách môn học và điểm
    renderListSubject(subjects);
    alert("Lưu thành công!");
}

// Hiển thị danh sách môn học và điểm
function renderListSubject(subjects = null) {
    subjects = subjects || JSON.parse(localStorage.getItem(`subjects:${studentId}`)) || [];

    document.getElementById('list-student').style.display = 'block';

    let tableContentSubject = `<tr>
        <th>#</th>
        <th>Tên môn</th>
        <th>Số tc</th>
        <th>Điểm TX1</th>
        <th>Điểm TX2</th>
        <th>Điểm cuối kỳ</th>
        <th>Điểm tổng</th>
        <th>Hành động</th>
    </tr>`;

    subjects.forEach((subject, index) => {
        index++;
        tableContentSubject += `<tr>
            <td>${index}</td>
            <td>${subject.subjectName}</td>
            <td>${subject.soTc}</td>
            <td>${subject.pointTx1}</td>
            <td>${subject.pointTx2}</td>
            <td>${subject.pointKt}</td>
            <td>${subject.totalPoint}</td>
            <td>
                <a href='#' onclick='editSubject(${index - 1})'>Cập nhật</a> | <a href='#' onclick='deleteSubject(${index - 1})'>Xóa</a>
            </td>
        </tr>`;
    });

    document.getElementById('list-students').innerHTML = tableContentSubject;
}

// Hàm chỉnh sửa điểm của môn học
function editSubject(id) {
    let subjects = localStorage.getItem(`subjects:${studentId}`) ? JSON.parse(localStorage.getItem(`subjects:${studentId}`)) : [];
    let subject = subjects[id];

    if (subject) {
        document.getElementById('subject').value = subject.subjectName;
        document.getElementById('soTc').value = subject.soTc;
        document.getElementById('point_tx1').value = subject.pointTx1;
        document.getElementById('point_tx2').value = subject.pointTx2;
        document.getElementById('point_kt').value = subject.pointKt;
        editingIndex = id; // Đặt chế độ chỉnh sửa
    } else {
        alert('Môn học không tìm thấy');
    }
}

// Xóa môn học
function deleteSubject(id) {
    let subjects = localStorage.getItem(`subjects:${studentId}`) ? JSON.parse(localStorage.getItem(`subjects:${studentId}`)) : [];
    subjects.splice(id, 1);
    localStorage.setItem(`subjects:${studentId}`, JSON.stringify(subjects));
    renderListSubject();
}

// Quay lại trang quản lý sinh viên
function back() {
    window.location.href = 'admin.html';
}

window.onload = function () {
    renderListSubject();
};
