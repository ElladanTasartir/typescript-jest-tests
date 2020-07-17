// Podemos criar testes com o JEST de duas maneiras
// Ou com it();
// Ou com test();
// Ambos são iguais para o JEST, então independete do que usar, o resultado será o mesmo
// Podemos também, fazer grupos de testes utilizando o describe
// Estrutura de teste:

import { Persistence } from './persistence';

describe('Persistence', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined', () => {
    // SUT (System under test) por convenção é o nome por convenção
    //  De classes, objetos, etc que estão sendo criados para ser testados
    const sut = new Persistence();
    // Espero que o método não retorne nada
    // Teste inútil, mas criado
    expect(sut.saveOrder()).toBe(undefined);
  });
  it('should call console.log once', () => {
    const sut = new Persistence();
    // Spy on vai ficar espiando o meu objeto e analisar
    // por chamadas de métodos e etc
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    // Esse teste, acontecendo só uma vez, funciona como deveria
    // Mas, se colocarmos mais um teste que executa um log, ele pode vir a falhar
    // Porque esse consoleSpy vai contar dois logs realizados
    // Por isso, precisamos falar para o JEST limpar esses
    // Mocks depois de cada teste
  });

  it('should call console.log with "Pedido salvo com sucesso"', () => {
    const sut = new Persistence();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    // Espera que a função seja chamada com exatamente aquele argumento
    // Uma vírgula diferente e o teste falharia
    expect(consoleSpy).toHaveBeenCalledWith('Pedido salvo com sucesso');
  });
});
