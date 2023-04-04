import {CalculatorService} from './calculator.service';
import {LoggerService} from '../logger/logger.service';

describe('Calculator Service', (): void => {
  it('should add two numbers', () => {
    const loggerService: LoggerService = new LoggerService();
    const calculator: CalculatorService = new CalculatorService(loggerService);
    let result: number = calculator.add(2, 2);
    expect(result).toBe(4);
  });

  it('should subtract two numbers', (): void => {
    const loggerService: LoggerService = new LoggerService();
    const calculator: CalculatorService = new CalculatorService(loggerService);
    let result: number = calculator.subtract(2, 2);
    expect(result).toBe(0);
  });
})
