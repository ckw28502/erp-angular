import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("isLoggedIn method test", () => {
    it('Should return false if token not found!', () => {
      spyOn(sessionStorage, "getItem").and.returnValue(null);
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('Should return true if token is found!', () => {
      spyOn(sessionStorage, "getItem").and.returnValue("token");
      expect(service.isLoggedIn()).toBeTrue();
    });
  });
});
