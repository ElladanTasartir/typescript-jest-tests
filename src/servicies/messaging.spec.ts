// As vezes pode ser interessante rodar um --clearCache para limpar o cache
// Já que algumas vezes fazemos muitos testes e isso pode fazer com que
// Por questões de cache, alguns testes não passem de jeito algum
import { Messaging } from './messaging';

// Factory para criar objetos
const createSut = () => {
  return new Messaging();
};

// A ordem dos testes nunca deveria impactar o funcionamento dos mesmos
// Por isso a limpeza de mocks pode ser interessante quando isso acontecer

describe('Messaging', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined', () => {
    const sut = createSut();

    expect(sut.sendMessage('teste')).toBe(undefined);
  });

  it('should call console.log with "Mensagem enviada:" and "teste"', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('teste');

    expect(consoleSpy).toHaveBeenCalledWith('Mensagem enviada:', 'teste');
  });

  it('should call console.log once', () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, 'log');
    sut.sendMessage('teste');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
