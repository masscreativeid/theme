let productsInCart = JSON.parse(localStorage.getItem("Products")) || [];

// add to cart
function addCartPlus(id) {
  let skuId = id;
  let lookUpItem = productsInCart.find((item) => item.sku === skuId.id);
  let LookUpProduct = products.find((item) => item.sku === skuId.id);

  if (lookUpItem === undefined) {
    productsInCart.push({
      sku: skuId.id,
      incart: 1,
      category: LookUpProduct.category,
      subcategory: LookUpProduct.subcategory,
      developer: LookUpProduct.developer,
      itemname: LookUpProduct.itemname,
      version: LookUpProduct.version,
      filesize: LookUpProduct.filesize,
      uploaddate: LookUpProduct.uploaddate,
      price: LookUpProduct.harga,
      imglink: LookUpProduct.imglink,
      postlink: LookUpProduct.postlink,
      tCost: LookUpProduct.harga,
    });
  } else {
    lookUpItem.incart += 1;
    lookUpItem.tCost = lookUpItem.incart * lookUpItem.price;
  }
  miniCartList();
  TotalAmount();
  calculation();
  localStorage.setItem("Products", JSON.stringify(productsInCart));
}

let calculation = () => {
  let cartIcon = document.getElementById("cart-qty");
  cartIcon.innerHTML = productsInCart.map((x) => x.incart).reduce((x, y) => x + y, 0);
};

let miniCartList = () => {
  let miniProductList = document.getElementById("mini-products-list");
  let miniCartTotals = document.getElementById("btnActions");
  if (productsInCart.length !== 0) {
    miniProductList.innerHTML = productsInCart
      .map((x) => {
        let { sku, incart } = x;
        let LookUpProduct = products.find((y) => y.sku === sku) || [];
        // console.log(search);
        return `
        <li class="item" id="mini${sku}">
          <a href="#" title="${LookUpProduct.itemname}" class="product-image">
            <img src="${LookUpProduct.imglink.replace(
              "noData",
              "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjk84bP7K0t2HAmzdK2rIbYRFh24u9YGFOyMnH8571ApYlgpV15iz8z4HbIdzqqP3y5XqVYP2151c6soQysyBlPAvrr9LYJlOxGZSr9DHDw_gDCEOYcmCPD0dmAyRN7U89z5SD-66zM7sXWk0XzScgrXEMYbIkqigp1qYtibRj2OpwDvzzIOrYADTz_fQ/s1600/no-image.png"
            )}" alt="${LookUpProduct.itemname}"/>
          </a>
          <div class="product-details">
            <p class="product-name">
              <a href="#">${LookUpProduct.itemname} </a>
            </p>
            <p class="qty-price">${incart}X <span class="price">${LookUpProduct.harga}</span></p>
            <a onclick="removeItem(${sku})" style="cursor:pointer;"title="Remove This Item" class="btn-remove">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </li>
        `;
      })
      .join("");
  } else {
    miniProductList.innerHTML = `
    <li class="alert alert-danger" style="text-align: center;">
	  <strong>Ouw la..la..!</strong> masih kosong dong 😫 <br/>👉 <a href="/p/shop.html" class="alert-link">Pilih item</a> dulu yuk 👌
	</li>
    `;
    miniCartTotals.innerHTML = ``;
  }
};

let TotalAmount = () => {
  let miniCartTotals = document.getElementById("btnActions");
  if (productsInCart.length !== 0) {
    let amount = productsInCart
      .map((x) => {
        let { incart, sku } = x;
        let item = productsInCart.find((y) => y.sku === sku) || [];

        return incart * item.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    miniCartTotals.innerHTML = `
    <div class="totals">
      <span class="label">Total:</span>
      <span class="price-total"><span class="price">${amount}</span></span>
    </div>
    <div class="actions">
      <a class="btn btn-dark" href="#" style="min-width:120px;">View Cart</a>
      <a class="btn btn-primary" href="#" style="min-width:120px;">Checkout</a>
    </div>
      `;
  } else return;
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  productsInCart = productsInCart.filter((x) => x.sku !== selectedItem.id);
  miniCartList();
  TotalAmount();
  calculation();
  localStorage.setItem("Products", JSON.stringify(productsInCart));
};

miniCartList();
TotalAmount();
calculation();
