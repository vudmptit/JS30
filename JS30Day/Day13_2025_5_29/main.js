document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('button');
    const table = document.querySelector('table');
    
    let editingRow = null;

    button.addEventListener('click', function (event) {
        event.preventDefault();

        const msv = document.getElementById('msv').value.trim();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('mail').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (!msv || !name || !email || !phone) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (editingRow) {
            editingRow.children[0].textContent = msv;
            editingRow.children[1].textContent = name;
            editingRow.children[2].textContent = email;
            editingRow.children[3].textContent = phone;

            editingRow = null;
            button.textContent = 'Thêm';
        } else {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${msv}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${phone}</td>
                <td><button class="edit-btn">Sửa</button></td>
            `;

            table.appendChild(newRow);
            newRow.querySelector('.edit-btn').addEventListener('click', function () {
                editingRow = newRow;
                document.getElementById('msv').value = editingRow.children[0].textContent;
                document.getElementById('name').value = editingRow.children[1].textContent;
                document.getElementById('mail').value = editingRow.children[2].textContent;
                document.getElementById('phone').value = editingRow.children[3].textContent;
                button.textContent = 'Lưu';
            });
        }

        document.getElementById('msv').value = '';
        document.getElementById('name').value = '';
        document.getElementById('mail').value = '';
        document.getElementById('phone').value = '';
    });
});