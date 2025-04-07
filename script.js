let cart = [];

// Elementos do Carrinho
const cartLink = document.getElementById('cart-link');
const cartContainer = document.getElementById('cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const sendWhatsappButton = document.getElementById('send-whatsapp');
const closeCartButton = document.getElementById('close-cart');

// Adicionar ao Carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.dataset.name;
    const productPrice = parseInt(this.dataset.price);

    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
  });
});

// Atualizar Carrinho
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.price} Kz (x${item.quantity}) <button class="remove-item" data-index="${index}">Remover</button>`;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = `${total} Kz`;

  // Adicionar funcionalidade de remoção
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Exibir carrinho
cartLink.addEventListener('click', () => {
  cartContainer.style.display = 'block';
});

// Fechar carrinho
closeCartButton.addEventListener('click', () => {
  cartContainer.style.display = 'none';
});

// Enviar via WhatsApp
sendWhatsappButton.addEventListener('click', () => {
  let message = 'Itens no Carrinho:\n\n';
  cart.forEach(item => {
    message += `${item.name} - ${item.price} Kz (x${item.quantity})\n`;
  });
  message += `\nTotal: ${cartTotal.textContent}\n\nGostaria de realizar a compra.`;

  const whatsappUrl = `https://wa.me/244923456789?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});
