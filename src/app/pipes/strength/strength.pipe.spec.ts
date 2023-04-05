import {StrengthPipe} from './strength.pipe';

describe('StrengthPipe', (): void => {
  it('create an instance', (): void => {
    const pipe: StrengthPipe = new StrengthPipe();
    expect(pipe).toBeTruthy();
  });

  it('should display weak if 5 value is passed', (): void => {
    const pipe: StrengthPipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display strong if 10 value is passed', (): void => {
    const pipe: StrengthPipe = new StrengthPipe();
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });

  it('should display strongest if 20 value is passed', (): void => {
    const pipe: StrengthPipe = new StrengthPipe();
    expect(pipe.transform(20)).toEqual('20 (strongest)');
  });
});
