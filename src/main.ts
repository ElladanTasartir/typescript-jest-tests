import { ShoppingCart } from './classes/shopping-cart';
import { Order } from './classes/order';
import { Persistence } from './servicies/persistence';
import { Product } from './classes/product';
import { NoDiscount } from './classes/discount';
import { EnterpriseCustomer } from './classes/customer';
import { Messaging } from './servicies/messaging';

const enterpriseCustomer = new EnterpriseCustomer('Empresa 1', '22222222222');
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistence = new Persistence();

const order = new Order(
  shoppingCart,
  messaging,
  persistence,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
