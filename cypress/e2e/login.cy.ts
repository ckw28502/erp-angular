import { User } from "../../src/app/shared/models/user.model";
import { LoginResponse } from "../../src/app/shared/dto/responses/auths/login-response.model";
import { Role } from "../../src/app/shared/models/enums/role";

describe('Login Tests', () => {
  let user: User;
  beforeEach((): void => {
    cy.visit("http://localhost:4200");
    
  })

  before((): void => {
    cy.fixture("users.json").then((data): void => {
      user = new User(data.user);
    })
  })

  it('Should show error if fields are empty!', (): void => {
    cy.get("#input-login-username").click({force: true});
    cy.get("#input-login-password").click({force: true});
    cy.get("#btn-login-submit").click();

    cy.contains("mat-error", "USERNAME REQUIRED!");
    cy.contains("mat-error", "PASSWORD REQUIRED!");
  });

  it('Should show error if credentials are invalid!', (): void => {
    cy.mockServerRequest("POST", "/login", 400);

    cy.get("#input-login-username").type(user.getUsername(), {force: true});
    cy.get("#input-login-password").type(user.getPassword(), {force: true});
    cy.get("#btn-login-submit").click();

    cy.contains("div", "INVALID CREDENTIALS PROVIDED!");
  });

  it('Should login if credentials are valid!', (): void => {
    const response: LoginResponse = {
      token: "token",
      role: Role.SALES
    }
    cy.mockServerRequest("POST", "employees/login/", 200, response);

    cy.get("#input-login-username").type(user.getUsername(), {force: true});
    cy.get("#input-login-password").type(user.getPassword(), {force: true});
    cy.get("#btn-login-submit").click();
  });
})
