if (!localStorage.getItem("users")) {
    const defaultUsers = [
        {
        name: "Admin",
        email: "admin@example.com",
        password: "123456",
        role: "admin"
        },
        {
        name: "User",
        email: "user@example.com",
        password: "123456",
        role: "user"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
}
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorDiv = document.getElementById("login-error");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (user.role === "admin") {
        window.location.href = "admin.html";
        } else {
        window.location.href = "home.html";
        }
    } else {
        errorDiv.textContent = "Sai email hoặc mật khẩu.";
    }
}
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
function addUser() {
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value;

    if (!name || !email || !role) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ name, email, password: "123456", role });
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
}

function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
}

function renderUsers() {
    const userTable = document.getElementById("user-table");
    if (!userTable) return;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    userTable.innerHTML = "";
    users.forEach((user, index) => {
        userTable.innerHTML += `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><button onclick="deleteUser(${index})">Xóa</button></td>
        </tr>
        `;
    });
}
function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const desc = document.getElementById("product-desc").value;
    const img = document.getElementById("product-img").value;

    if (!name || !price || !desc || !img) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ name, price, desc, img });
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

function renderProducts() {
    const table = document.getElementById("product-table");
    if (!table) return;
    const products = JSON.parse(localStorage.getItem("products")) || [];

    table.innerHTML = "";
    products.forEach((p, index) => {
        table.innerHTML += `
        <tr>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.desc}</td>
            <td><img src="${p.img}" width="60"></td>
            <td><button onclick="deleteProduct(${index})">Xóa</button></td>
        </tr>
        `;
    });
}
function showProductsForUser() {
    const container = document.getElementById("product-list");
    if (!container) return;
    const products = JSON.parse(localStorage.getItem("products")) || [];

    container.innerHTML = "";
    products.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Giá: ${p.price}</p>
            <p>${p.desc}</p>
        </div>
        `;
    });
}
window.onload = () => {
    renderUsers();
    renderProducts();
    showProductsForUser();
}