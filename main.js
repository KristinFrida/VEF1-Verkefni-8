import { formatPrice } from './lib/helpers.js';
import { createCartLine, showCartContent} from './lib/ui.js';

/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

/**
 * Bæta vöru í körfu
 * @param  {Product} product
 * @param {number} quantity 
 */
function addProductToCart(product, quantity) {
  const cartTableElement = document.querySelector('.cart table');
  const cartTableBodyElement = document.querySelector('.cart table tbody');

  
  
  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table');
    return;
  }

  const ThecartLine = cartTableBodyElement.querySelector(
    `tr[data-product-id="${product.id}"]`,
  );

  if(!ThecartLine){
    const cartLine = createCartLine(product, quantity);
    cartTableBodyElement.appendChild(cartLine);
  }
  else{
    UpdateCartLine(product, quantity, ThecartLine);
  }

  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu
  updateCartTotal(cartTableElement);
}



function UpdateCartLine(product, quantity, cartLine){
  const quantityOfLine = cartLine.getAttribute('data-quantity')

  const quantityNow = parseInt(quantityOfLine, 10);
  const updatedQuantity = quantity + quantityNow;

  cartLine.setAttribute('data-quantity', updatedQuantity.toString());
  cartLine.querySelector('.foo').textContent = updatedQuantity.toString()
  cartLine.querySelector('.total').textContent = (formatPrice(updatedQuantity*product.price))
}



function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  if (!product) {
    return;
  }

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  const quantityInputElement = parent.querySelector(
    'input'
  );

  if (!quantityInputElement){
    console.warn('gat ekki fundið fjölda input');
    return;
  }
  const quantity = Number.parseInt(quantityInputElement.value);


  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

function updateCartTotal(cartTableElement) {
  const cartBody = cartTableElement.querySelectorAll('tbody tr');
  let totalAmount = 0;
  for (const line of cartBody) {
    const p = Number.parseInt(line.dataset.price);
    const q = Number.parseInt(line.dataset.quantity);
    totalAmount += p*q;
  }

  const cartTotal = cartTableElement.querySelector('tfoot .price');
  console.log(cartTotal)
  cartTotal.textContent = formatPrice(totalAmount);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun
document.addEventListener("DOMContentLoaded", function() {

  
  let state = 'form';
  const toggleButton = document.getElementById("toggleButton");
  const formFields = document.querySelectorAll('.form-field');
  const receiptSection = document.querySelector('.receipt');


  toggleButton.addEventListener("click", function(event) {

    event.preventDefault();

    if (state === 'form') {

      formFields.forEach(function(field) {
        field.style.display = "block";
      });
      state = 'receipt';
    } else if (state === 'receipt') {

      receiptSection.style.display = "block";
      toggleButton.style.display = "none";
      formFields.forEach(function(field) {
        field.style.display = "none";
      });
    }
  });
});

// karfan að vera tóm í  hvert skiptið sem er refreshað síðunni
localStorage.clear();