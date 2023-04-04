import {CalculatorService} from './calculator.service';

describe('Calculator Service', (): void => {
  it('should add two numbers', (): void => {
    let mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator: CalculatorService = new CalculatorService(mockLoggerService);
    let result: number = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', (): void => {
    let mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    const calculator: CalculatorService = new CalculatorService(mockLoggerService);
    let result: number = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
})
