/// <reference types="cypress" />

describe('Sauce Demo', function () {

    let itemPrice;
    let checkoutPrice;
   
    it('Navigate URL', function () {
    
        cy.visit("https://www.saucedemo.com/")
        cy.url().should('include', 'saucedemo')
       


    })

    it('Get Value', function () {

        cy.visit("https://www.saucedemo.com/")
        cy.url().should('include', 'saucedemo')
        cy.get('[data-test="username"]').type('standard_user').invoke('val').as('username')
        cy.get('[data-test="password"]').type('secret_sauce').invoke('val').as('password');
      
        cy.get('@username').then((username) => {
            cy.log('Username:', username);
          });
      
          cy.get('@password').then((password) => {
            cy.log('Password:', password);
          });


    })


    it('Login', function(){
        cy.visit("https://www.saucedemo.com/")

        cy.fixture('example.json').then((data) => {
        const { username, password } = data;
  
     
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
      });
    });


    it('Get harga barang', function(){
        cy.visit("https://www.saucedemo.com/")

        cy.fixture('example.json').then((data) => {
        const { username, password } = data;
  
        // Login using saved values
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
        cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price')
        .invoke("text")
        .then((priceText) => {
          const price = parseFloat(priceText.replace("$", ""));
          cy.wrap(price).as("hargaBarang"); // Storing the price value in a Cypress alias "hargaBarang".
        });
      });

    })

      it('Checkout barang', function(){
        cy.visit("https://www.saucedemo.com/")

        cy.fixture('example.json').then((data) => {
        const { username, password } = data;
  
        // Login using saved values
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
        cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price')
        .invoke('text').then((text) => {
            itemPrice = text.trim();
          });
        

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_price').invoke('text').then((text) => {
            checkoutPrice = text.trim();
      
            // Verify that the item price during checkout is the same as the one from the homepage
            expect(checkoutPrice).to.eq(itemPrice);
      
            // Save the checkout price to a Cypress variable (for future use if needed)
            cy.wrap(checkoutPrice).as('checkoutPrice');
          });
      
      });

    });

    it('Checkout Sampai selesai ', function(){
        cy.visit("https://www.saucedemo.com/")

        cy.fixture('example.json').then((data) => {
        const { username, password } = data;
   
        // Login using saved values
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
        cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price')
        .invoke('text').then((text) => {
            itemPrice = text.trim();
          });
        

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_price').invoke('text').then((text) => {
            checkoutPrice = text.trim();
      
            // Verify that the item price during checkout is the same as the one from the homepage
            expect(checkoutPrice).to.eq(itemPrice);
      
            // Save the checkout price to a Cypress variable (for future use if needed)
            cy.wrap(checkoutPrice).as('checkoutPrice');
          });

          cy.get('[data-test="checkout"]').click()
          cy.get('[data-test="firstName"]').type('Vico')
          cy.get('[data-test="lastName"]').type('Hadi')
          cy.get('[data-test="postalCode"]').type('40283')
          cy.get('[data-test="continue"]').click()
          cy.get('[data-test="finish"]').click()
          cy.contains('Thank you for your order!').should('be.visible')
      
      });

    });



    })


    