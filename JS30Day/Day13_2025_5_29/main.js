document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('button');
    const table = document.querySelector('table');

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

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${msv}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
        `;
 
        table.appendChild(newRow);

        document.getElementById('msv').value = '';
        document.getElementById('name').value = '';
        document.getElementById('mail').value = '';
        document.getElementById('phone').value = '';
    });
});