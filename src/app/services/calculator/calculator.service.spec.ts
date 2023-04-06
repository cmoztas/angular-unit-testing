import {CalculatorService} from './calculator.service';
import {TestBed} from '@angular/core/testing';
import {LoggerService} from '../logger/logger.service';

function setUp() {
  const mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);

  TestBed.configureTestingModule({
    providers: [
      CalculatorService,
      {provide: LoggerService, useValue: mockLoggerService}
    ]
  });

  const calculator: CalculatorService = TestBed.inject(CalculatorService);
  const loggerServiceSpy: jasmine.SpyObj<LoggerService> = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>;

  return {calculator, loggerServiceSpy}
}

describe('Calculator Service', (): void => {
  it('should add two numbers', (): void => {
    const {calculator, loggerServiceSpy} = setUp();
    let result: number = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', (): void => {
    const {calculator, loggerServiceSpy} = setUp();
    let result: number = calculator.subtract(2, 2);
    expect(result).toBe(0);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });
})
