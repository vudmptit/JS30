class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    tongTien() {
        return this.price * this.quantity;
    }
}

let products = [];

function addProduct() {
    const id = parseInt(document.getElementById("id").value);
    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const errorEl = document.getElementById("error");

    let idExists = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            idExists = true;
            break; 
        }
    }

    if (idExists) {
        alert("ID đã tồn tại. Vui lòng chọn ID khác");
        return;
    }
    errorEl.textContent = "";

    const newProduct = new Product(id, name, price, quantity);
    products.push(newProduct);

    clearForm();
    renderProducts();
}

function clearForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

function renderProducts() {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.tongTien()}</td>
            <td>
                <button onclick="editProduct(${index})">Sửa</button>
                <button onclick="deleteProduct(${index})">Xóa</button>
            </td>
        `;
        table.appendChild(row);
    });

    document.getElementById("totalValue").textContent = tinhTongGiaTri();
    document.getElementById("maxProduct").textContent = getMaxProductName();
}

function tinhTongGiaTri() {
    let sum = 0;
    for (let i = 0; i < products.length; i++) {
        sum += products[i].tongTien();
    }
    return sum;
}

function getMaxProductName() {
    if (products.length === 0) return "Không có";
    let max = products[0];
    for (let p of products) {
        if (p.price > max.price) max = p;
    }
    return `${max.name} (${max.price} VNĐ)`;
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

function editProduct(index) {
    const product = products[index];
    document.getElementById("id").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("quantity").value = product.quantity;
    deleteProduct(index); 
}

function searchProduct() {
    const searchId = parseInt(document.getElementById("searchId").value)
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === searchId) {
            found = products[i];
            foundIndex = i;
            break; 
    }
    }

    if (found) {
        const row = document.createElement("tr");
        row.innerHTML =`
        <td>${found.id}</td>
        <td>${found.name}</td>
        <td>${found.price}</td>
        <td>${found.quantity}</td>
        <td>${found.tongTien()}</td>
        <td>
            <button onclick = "editProdutc(${products.indexOf(found)})">Sửa</button>
            <button onclick = "deleteProdutc(${products.indexOf(found)})">Xoá</button>
        </td>
        `;
        table.appendChild(row);

        document.getElementById('totalValue'.textContent = "0")
        document.getElementById('maxProduct'.textContent = "Không có")
    }
}