// Não é uma boa prática ter um teste com vários tipos de testes dentro dele
// Porque fica difícil encontrar o que deu errado no caso de um teste falhar
describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 10;

    // O toBe não funciona com objetos pois um objeto
    // Pode não ser o outro, por isso usamos o toEqual
    expect(number).toBe(10);
    expect(number).toEqual(10);

    expect(number).toBeGreaterThan(9);
    expect(number).toBeGreaterThanOrEqual(10);
    expect(number).toBeLessThan(11);
    expect(number).toBeLessThanOrEqual(10);
  });

  it('should split tests', () => {
    const number = 10;
    // Se o NÚMERO enviado está próximo do valor enviado e o número
    // de digitos para o segundo parâmetro, o padrão é 2
    expect(number).toBeCloseTo(9.9999, 2);

    // Número não seja nulo
    expect(number).not.toBeNull();
    expect(number).not.toBeFalsy();
    expect(number).toBeTruthy();

    // Checa se existe uma certa propriedade dentro do objeto
    expect(number).toHaveProperty('toString');
  });
});

describe('Objects', () => {
  it('should test jest assertions with objects', () => {
    const person = { name: 'Erick', age: 20 };
    const anotherPerson = { ...person };

    expect(person).toEqual(anotherPerson);
    // O segundo parâmetro é o valor que queremos que a proprieade tenha
    expect(person).toHaveProperty('age', 20);
    expect(person).not.toHaveProperty('lastName');

    expect(person.name).toBe('Erick');
  });
});
