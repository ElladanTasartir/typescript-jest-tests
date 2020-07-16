// Podemos criar testes com o JEST de duas maneiras
// Ou com it();
// Ou com test();
// Ambos são iguais para o JEST, então independete do que usar, o resultado será o mesmo
// Podemos também, fazer grupos de testes utilizando o describe
// Estrutura de teste:

describe('TESTANDO ALGUMA COISA', () => {
  it('should return one', () => {
    const number = 1;
    expect(number).toBe(1);
  });
});

describe('TESTANDO OUTRA COISA', () => {
  test('should return Erick', () => {
    const nome = 'Erick';
    expect(nome).toBe('Erick');
  });
});
