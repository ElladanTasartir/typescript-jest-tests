/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order } from './order';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { CartItem } from './interfaces/cart-item';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistenceProtocol } from './interfaces/persistence-protocol';
import { CustomerOrder } from './interfaces/customer-protocol';

// Muitos desses métodos que são inúteis para Order mas que estão
// Na interface de ShoppingCart poderiam ter sido evitados
// Se tivéssemos criado uma interface mais enxuta somente
// Com os métodos que importam para Order, e aí o cart implementaria
// Mais de uma interface
class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 2;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMessage() {}
}

class PersistenceMock implements PersistenceProtocol {
  saveOrder() {}
}

class CustomerMock implements CustomerOrder {
  getName() {
    return '';
  }

  getIDN() {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistenceMock = new PersistenceMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistenceMock,
    customerMock,
  );

  return { sut, shoppingCartMock, messagingMock, persistenceMock };
};

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      // O mockReturnValueOnce vai pegar o que enviarmos e falar para
      // A nossa classe que esse foi o valor recebido da função
      // Quando na verdade, na mock que criamos, ele retorna false
      // Dessa forma, não precisamos recriar o funcionamento original
      // De métodos da classe real e deixar os retornos serem lidados
      // Pela mock quando for necessário
      .mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistenceMock } = createSut();
    const persistenceMockSpy = jest.spyOn(persistenceMock, 'saveOrder');
    sut.checkout();
    expect(persistenceMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
