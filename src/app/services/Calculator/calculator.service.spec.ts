import {CalculatorService} from './calculator.service';

describe('Calculator Service', (): void => {
  it('should add two numbers', () => {
    const calculator: CalculatorService = new CalculatorService();
    let result: number = calculator.add(2, 2);
    expect(result).toBe(4);
  });

  it('should subtract two numbers', (): void => {
    const calculator: CalculatorService = new CalculatorService();
    let result: number = calculator.subtract(2, 2);
    expect(result).toBe(0);
  });
})
