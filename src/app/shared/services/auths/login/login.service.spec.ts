import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import userData from '../../../../../assets/data/users.json';
import { LoginResponse } from '../../../dto/responses/auths/login-response.model';
import { LoginRequest } from '../../../dto/requests/auths/login-request.model';
import { environment } from '../../../../../environments/environment.development';

describe('LoginService', () => {
  let service: LoginService;

  let httpController: HttpTestingController;

  const testUrl: string = `${environment.serverUri}/employees/login/`;

  const request: LoginRequest = userData.user;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return error if credentials invalid!', (done: DoneFn) => {

    const errorBody = {
      error: {
        non_field_errors : [
          "Unable to log in with provided credentials."
        ]
      },
      status: 400,
      statusText: "Bad Request"
    };

    service.login(request).subscribe({
      next: () => fail("Request should be invalid!"),
      error: (error: HttpErrorResponse) => {
        expect(error.error).withContext("error").toEqual(errorBody.error);
        expect(error.status).withContext("status").toEqual(errorBody.status);
        expect(error.statusText).withContext("statusText").toEqual(errorBody.statusText);

        done();
      }
    });

    const req = httpController.expectOne(testUrl);

    req.flush(errorBody.error, errorBody);

  });

  it('should return the access token if credentials are valid!', (done: DoneFn) => {
    const responseBody: LoginResponse = { token: "token" };

    service.login(request).subscribe({
      next: (response: LoginResponse) => {
        expect(response.token).toEqual(responseBody.token);
        
        done();
      },
      error: () => fail("Request should not return error!")
    });

    const req = httpController.expectOne(testUrl);

    req.flush(responseBody);

  });

});
