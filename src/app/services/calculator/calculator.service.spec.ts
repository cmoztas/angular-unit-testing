import {CalculatorService} from './calculator.service';

describe('Calculator Service', (): void => {
  let mockLoggerService: any;
  let calculator: CalculatorService;

  beforeEach((): void => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    calculator = new CalculatorService(mockLoggerService);
  })

  it('should add two numbers', (): void => {
    let result: number = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', (): void => {
    let result: number = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });
})
