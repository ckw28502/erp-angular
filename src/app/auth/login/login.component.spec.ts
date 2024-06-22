import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../shared/services/auths/login/login.service';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginEl: HTMLElement;
  let btnSubmit: HTMLElement;

  beforeEach(async () => {
    const loginService: jasmine.SpyObj<LoginService> = jasmine.createSpyObj("LoginService", ["login"]);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: LoginService, useValue: loginService}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    const loginDe = fixture.debugElement;
    loginEl = loginDe.nativeElement;    
    btnSubmit = loginDe.query(By.css("#btn-login-submit"))!.nativeElement;
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('Should show error if username is empty', (): void => {
    btnSubmit.click();

    const errors: HTMLElement[] = Array.from(loginEl.querySelectorAll("mat-error"));

    const usernameError: HTMLElement = errors.find(error => error.textContent === "USERNAME REQUIRED!")!;
    const passwordError: HTMLElement = errors.find(error => error.textContent === "USERNAME REQUIRED!")!;

    expect(usernameError).toBeTruthy();
    expect(passwordError).toBeTruthy();
  });
});
