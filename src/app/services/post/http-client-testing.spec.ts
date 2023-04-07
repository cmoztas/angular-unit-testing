import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';

interface Data {
  name: string;
}

const testUrl: string = '/data';

describe('Http Client Testing Module', (): void => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call the testUrl with get request', (): void => {
    const testData: Data = {name: 'Çağkan Mert'};
    httpClient.get<Data>(testUrl).subscribe((data: Data) => {
      expect(data).toEqual(testData);
    });
    const request: TestRequest = httpTestingController.expectOne('/data');
    request.flush(testData);
    expect(request.request.method).toBe('GET');
  });
});
