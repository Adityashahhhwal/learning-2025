export function getMatchingProduct(productId) {
  return products.find((product) => product.id === productId);
} // Find the product in the products list that matches the given productId

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

/*
const date = new Date();
console.log(date);
console.log(date.toLocaleTimeString());
*/

/*
console.log(this);

const object2 = {
  a: 2,
  b: this.a
};
*/

/*
function logThis() {
  console.log(this);
}
logThis();
logThis.call('hello');

this
const object3 = {
  method: () => {
    console.log(this);
  }
};
object3.method();
*/

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {

    productsData.forEach((productDetails) => {
      if (productDetails.type === 'clothing') {
        products.push(new Clothing(productDetails));
      } else {
        products.push(new Product(productDetails));
      }
    });

    console.log('load products');
  }).catch((error) => {
    console.log('Unexpected error. Please try again later.');
  });

  return promise;
}
/*
loadProductsFetch().then(() => {
  console.log('next step');
});
*/

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

    JSON.parse(xhr.response).forEach((productDetails) => {
      if (productDetails.type === 'clothing') {
        products.push(new Clothing(productDetails));
      } else {
        products.push(new Product(productDetails));
      }
    });

    console.log('load products');

    fun();
  });

  xhr.addEventListener('error', (error) => {
    console.log('Unexpected error. Please try again later.');
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}