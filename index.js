const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  const productList = document.getElementById('product-list');
  const cartList = document.getElementById('cart-list');
  const cartEmpty = document.getElementById('cart-empty');
  const totalPrice = document.getElementById('total-price');
  
  const cart = [];
  
  function renderProductList() {
    productList.innerHTML = '';
    Products.forEach((product) => {
      const li = document.createElement('li');
      li.innerHTML = `${product.name} - $${product.price}
      <button onclick="addToCart(${product.id})">+</button>
      <button onclick="removeFromCart(${product.id})">−</button>`;
      productList.appendChild(li);
    });
  }
  
  function renderCart() {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - $${item.price} (x${item.quantity})
      <button onclick="removeFromCart(${item.id})">−</button>`;
      cartList.appendChild(li);
      total += item.price * item.quantity;
    });
    totalPrice.textContent = total;
    cartEmpty.style.display = cart.length === 0 ? 'block' : 'none';
  }
  
  function addToCart(productId) {
    const product = Products.find((p) => p.id === productId);
    if (product) {
      const cartItem = cart.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
      }
      renderCart();
    }
  }
  
  function removeFromCart(productId) {
    const index = cart.findIndex((item) => item.id === productId);
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      renderCart();
    }
  }
  
  renderProductList();
  renderCart();
  