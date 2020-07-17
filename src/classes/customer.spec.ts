import { IndividualCustomer, EnterpriseCustomer } from './customer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEnterpriseCostumer = (
  name: string,
  cnpj: string,
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

afterEach(() => jest.clearAllMocks);

describe('Individual Customer', () => {
  it('should have firstName, lastName and cpf', () => {
    const sut = createIndividualCustomer('Erick', 'Malta', '111.111.111-11');
    expect(sut).toHaveProperty('firstName', 'Erick');
    expect(sut).toHaveProperty('lastName', 'Malta');
    expect(sut).toHaveProperty('cpf', '111.111.111-11');
  });

  it('should have methods to get name and idn for Individual Customers', () => {
    const sut = createIndividualCustomer('Erick', 'Malta', '111.111.111-11');
    expect(sut.getName()).toBe('Erick Malta');
    expect(sut.getIDN()).toBe('111.111.111-11');
  });
});

describe('Enterprise Customer', () => {
  it('should have name and cnpj', () => {
    const sut = createEnterpriseCostumer('Udemy', '222');
    expect(sut).toHaveProperty('name', 'Udemy');
    expect(sut).toHaveProperty('cnpj', '222');
  });

  it('should have methods to get name and idn for Enterprise Customers', () => {
    const sut = createEnterpriseCostumer('Udemy', '222');
    expect(sut.getName()).toBe('Udemy');
    expect(sut.getIDN()).toBe('222');
  });
});
