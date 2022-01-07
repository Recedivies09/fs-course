describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "Recedivies",
      password: "ahmadhi41",
      name: "Ahmadhi",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  //   it("Login form is shown", function () {
  //     cy.contains("login").click();

  //     cy.contains("username");
  //     cy.contains("password");
  //   });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      //   cy.get("#username").type("Recedivies");
      //   cy.get("#password").type("ahmadhi41");
      //   cy.get("#login-button").click();

      //   cy.contains("Recedivies logged in");
    });

    // it("fails with wrong credentials", function () {
    //   cy.get("#button-label").click();
    //   cy.get("#username").type("wrong-username");
    //   cy.get("#password").type("wrong-password");
    //   cy.get("#login-button").click();

    //   cy.get(".error").should("contain", "wrong credentials");
    // });
  });
});
