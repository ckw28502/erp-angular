import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../shared/services/auths/login/login.service';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginResponse } from '../../shared/dto/responses/auths/login-response.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginEl: HTMLElement;
  let btnSubmit: HTMLElement;
  let loginSpy: jasmine.Spy;
  let snackBarSpy: jasmine.Spy;

  beforeEach(async () => {
    const loginService: jasmine.SpyObj<LoginService> = jasmine.createSpyObj("LoginService", ["login"]);
    const response: LoginResponse = { token: "token" };
    loginSpy = loginService.login.and.returnValue(of(response));
    
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule,
        MatSnackBarModule
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: LoginService, useValue: loginService},
        {provide: MatSnackBar}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    const loginDe = fixture.debugElement;
    loginEl = loginDe.nativeElement;    
    btnSubmit = loginDe.query(By.css("#btn-login-submit"))!.nativeElement;

    const snackBar: MatSnackBar = TestBed.inject(MatSnackBar);
    snackBarSpy = spyOn(snackBar, "open");
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  function fillForm(): void {
    const inputUsername: HTMLInputElement = loginEl.querySelector("#input-login-username")!;
    const inputPassword: HTMLInputElement = loginEl.querySelector("#input-login-password")!;

    inputUsername.value = "user";
    inputPassword.value = "user";

    inputUsername.dispatchEvent(new Event("input"));
    inputPassword.dispatchEvent(new Event("input"));
  }

  it('Should show error if username is empty', (): void => {
    btnSubmit.click();

    const errors: HTMLElement[] = Array.from(loginEl.querySelectorAll("mat-error"));

    const usernameError: HTMLElement = errors.find(error => error.textContent === "USERNAME REQUIRED!")!;
    const passwordError: HTMLElement = errors.find(error => error.textContent === "USERNAME REQUIRED!")!;

    expect(usernameError).toBeTruthy();
    expect(passwordError).toBeTruthy(); 
  });

  it('Should show error if username is invalid!', fakeAsync(() => {
    loginSpy.and.returnValue(throwError(() => new HttpErrorResponse({
      status: 400,
      error: {"non_field_errors":["Unable to log in with provided credentials."]}
    })));

    fillForm();

    btnSubmit.click();

    expect(snackBarSpy).toHaveBeenCalled();
  }));
  
});
