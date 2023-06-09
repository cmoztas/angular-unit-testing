import {LoggerService} from './logger.service';
import {TestBed} from '@angular/core/testing';

describe('LoggerService', (): void => {
  let service: LoggerService;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });

    service = TestBed.inject(LoggerService);
  });

  it('should not have any messages at starting', function (): void {
    let count: number = service.messages.length;
    expect(count).toBe(0);
  });

  it('should add the message when log is called', (): void => {
    service.log('message');
    expect(service.messages.length).toBe(1);
  });

  it('should clear all the messages when clear is called', (): void => {
    service.log('message');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
})
