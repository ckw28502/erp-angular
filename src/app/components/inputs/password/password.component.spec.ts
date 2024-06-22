import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this for animations


describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let btnTogglePassword: HTMLElement;

  let passwordEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasswordComponent,
        BrowserAnimationsModule
      ],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    passwordEl = fixture.debugElement.nativeElement;
    btnTogglePassword = passwordEl.querySelector("#btn-toggle-password")!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(btnTogglePassword).toBeTruthy();
  });

  it('should toggle password', () => {
    expect(passwordEl.querySelector("input[type='password']")).toBeTruthy();
    expect(passwordEl.querySelector("input[type='text']")).toBeFalsy();
    expect(component.hidePassword).toBeTrue();

    btnTogglePassword.click();

    expect(passwordEl.querySelector("input[type='password']")).toBeFalsy();
    expect(passwordEl.querySelector("input[type='text']")).toBeTruthy();
    expect(component.hidePassword).toBeFalse();
    
    btnTogglePassword.click();

    expect(passwordEl.querySelector("input[type='password']")).toBeTruthy();
    expect(passwordEl.querySelector("input[type='text']")).toBeFalsy();
    expect(component.hidePassword).toBeTrue();
  });

  it('should emit the inputted value', (done: DoneFn) => {
    const expectedValue: string = "password value";

    const input: HTMLInputElement = passwordEl.querySelector("input")!;

    component.sendPasswordEvent.subscribe((actualValue: string) => {
      expect(expectedValue).toEqual(actualValue);
      done();
    });

    input.value = expectedValue;
    input.dispatchEvent(new Event("input"));

  });
});
