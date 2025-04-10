function toggleAddProduct() {
    const modal = document.getElementById("productModal");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function closeModal() {
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
    clearModalFields();
}

function clearModalFields() {
    document.getElementById("productName").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("price").value = '';
    document.getElementById("dateAdded").value = '';
    document.getElementById("productImage").value = '';
    document.getElementById("imagePreview").style.display = 'none';
}

function submitProduct() {
    const name = document.getElementById("productName").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const dateAdded = document.getElementById("dateAdded").value;
    const image = document.getElementById("productImage").files[0];

    const table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).innerText = name;
    newRow.insertCell(1).innerText = quantity;
    newRow.insertCell(2).innerText = price;
    newRow.insertCell(3).innerText = new Date(dateAdded).toLocaleString();

    const imgCell = newRow.insertCell(4);
    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(image);
    imgElement.style.maxWidth = "100px";
    imgCell.appendChild(imgElement);

    const actionsCell = newRow.insertCell(5);
    actionsCell.innerHTML = `
        <button class="action-button" onclick="editProduct(this)">Edit</button>
        <button class="action-button" onclick="deleteProduct(this)">Delete</button>
    `;

    closeModal();
}

function filterTable() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const table = document.getElementById("inventoryTable");
    const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const productName = row.cells[0].innerText.toLowerCase();

        if (productName.includes(searchInput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

function filterByQuantity() {
    const filterType = document.getElementById("quantityFilterType").value;
    const table = document.getElementById("inventoryTable");
    const rows = Array.from(table.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));

    rows.sort((a, b) => {
        const quantityA = parseInt(a.cells[1].innerText);
        const quantityB = parseInt(b.cells[1].innerText);
        return filterType === "least" ? quantityA - quantityB : quantityB - quantityA;
    });

    const tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}

function filterByDate() {
    const sortOrder = document.getElementById("sortOrder").value;
    const table = document.getElementById("inventoryTable");
    const rows = Array.from(table.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));

    rows.sort((a, b) => {
        const dateA = new Date(a.cells[3].innerText);
        const dateB = new Date(b.cells[3].innerText);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; 
    rows.forEach(row => tbody.appendChild(row));
}

function previewImage(event) {
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = "block";
}

function editProduct(button) {
    const row = button.parentElement.parentElement;
    document.getElementById("productName").value = row.cells[0].innerText;
    document.getElementById("quantity").value = row.cells[1].innerText;
    document.getElementById("price").value = row.cells[2].innerText;
    document.getElementById("dateAdded").value = new Date(row.cells[3].innerText).toISOString().slice(0, 16);
    
    toggleAddProduct();
    
}

function deleteProduct(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}

    