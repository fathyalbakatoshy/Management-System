let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let addBtn = document.getElementById("addBtn");
let upDateBtn = document.getElementById("upDateBtn");

let productList = [];

if (localStorage.getItem("product") == null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("product"));
  displayProduct(productList);
}

function addProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDesc()
  ) {
    product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };

    productList.push(product);
    displayProduct(productList);
    localStorage.setItem("product", JSON.stringify(productList));
    removeValidClass();
    clearInput();
  }
}

function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function displayProduct(product) {
  let cartona = ``;
  for (let i = 0; i < product.length; i++) {
    cartona += `
    <tr>
      <td>${i + 1}</td>
      <td>${product[i].newName ? product[i].newName : product[i].name}</td>
      <td>${product[i].price}</td>
      <td>${product[i].category}</td>
      <td>${product[i].desc}</td>
      <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-primary">Up Date</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("display").innerHTML = cartona;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  displayProduct(productList);
}

function searchProduct(key) {
  let arr = [];
  for (let i = 0; i < productList.length; i++) {
    let regex = new RegExp(key, "ig");
    if (regex.test(productList[i].name)) {
      productList[i].newName = productList[i].name.replace(
        regex,
        function (key) {
          return `<span class="text-danger">${key}</span>`;
        }
      );
      arr.push(productList[i]);
    }
  }
  displayProduct(arr);
}

let newIndex;

function setFormForUpdate(index) {
  newIndex = index;

  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDesc.value = productList[index].desc;

  addBtn.classList.replace("d-block", "d-none");
  upDateBtn.classList.replace("d-none", "d-block");
  removeValidClass();
}

function updateProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDesc()
  ) {
    let newDate = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };

    productList.splice(newIndex, 1, newDate);
    localStorage.setItem("product", JSON.stringify(productList));

    removeValidClass();
    displayProduct(productList);

    clearInput();

    addBtn.classList.replace("d-none", "d-block");
    upDateBtn.classList.replace("d-block", "d-none");
  }
}

function removeValidClass() {
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
    productDesc.classList.remove("is-valid");
}

function validateProductName() {
  let regex = /^[A-Z][a-z]{2,}$/;
  if (regex.test(productName.value)) {
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    return false;
  }
}

function validateProductPrice() {
  let regex = /([1-9][0-9]{3}|10000)$/;
  if (regex.test(productPrice.value)) {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    return false;
  }
}

function validateProductCategory() {
  let regex = /^(tv|phone|laptop)$/gi;
  if (regex.test(productCategory.value)) {
    productCategory.classList.remove("is-invalid");
    productCategory.classList.add("is-valid");
    return true;
  } else {
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    return false;
  }
}

function validateProductDesc() {
  let regex = /^(\w|\s){1,200}$/gi;
  if (regex.test(productDesc.value)) {
    productDesc.classList.remove("is-invalid");
    productDesc.classList.add("is-valid");
    return true;
  } else {
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    return false;
  }
}
