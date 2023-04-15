import {mockDefaultRoutes} from "../support/mock";

describe('main window tests', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.viewport('macbook-13')
		cy.visit('http://localhost:8080/')
	})

	it('test switch theme', () => {
		cy.get('button[data-testid="switch"]').click()

		cy.get('div[id="app"]').should('have.class', 'theme-light')
	})

	it('test the left menu', () => {
		cy.get('li[data-testid="leftmenu1"]').click()
		.should('contain.html', '/text2image')

		cy.get('li[data-testid="leftmenu2"]').click()
		.should('contain.html', '/history')
	})

	it('test the sidebar menu', () => {
		cy.get('button[data-testid="selectmenu"]').click()
		cy.get('.ant-drawer-wrapper-body')
		.should('not.have.class', 'ant-drawer-content-wrapper-hidden')

		cy.get('li[data-testid="menu1"]').click()
		.should('contain.html', '/text2image')

		cy.get('li[data-testid="menu2"]').click()
		.should('contain.html', '/profile')
	})

	it('test the login box, valid data', () => {
		cy.get('li[data-testid="login"]').click()
		cy.get('.ant-modal-content').should('be.visible')

		cy.get('input[id="username"]').type('Test Testerski')
		cy.get('input[id="password"]').type('bardzoBezpieczneHasło123!')

		cy.get('button[data-testid="loginbutton"]').click()

		cy.get('li[data-testid="logout"]').should('be.visible')
	})

	it('test the login box, without data', () => {
		cy.get('li[data-testid="login"]').click()
		cy.get('.ant-modal-content').should('be.visible')

		cy.get('input[id="username"]').type('{enter}')
		cy.get('div[id="username_help"]').should('be.visible')

		cy.get('input[id="password"]').type('{enter}')
		cy.get('div[id="password_help"]').should('be.visible')
	})

	it('test the register box, valid data', () => {
		cy.get('li[data-testid="register"]').click()
		cy.get('.ant-modal-content').should('be.visible')

		cy.get('input[id="username"]').type('Test Testerski')
		cy.get('input[id="password"]').type('bardzoBezpieczneHasło123!')

		cy.get('button[data-testid="registerbutton"]').click()

		cy.get('li[data-testid="logout"]').should('be.visible')
	})
	
	it('test the register box, without data', () => {
		cy.get('li[data-testid="register"]').click()
		cy.get('.ant-modal-content').should('be.visible')

		cy.get('input[id="username"]').type('{enter}')
		cy.get('div[id="username_help"]').should('be.visible')

		cy.get('input[id="password"]').type('{enter}')
		cy.get('div[id="password_help"]').should('be.visible')
	})

	it('test logout', () => {
		cy.get('li[data-testid="login"]').click()

		cy.get('input[id="username"]').type('Test Testerski')
		cy.get('input[id="password"]').type('bardzoBezpieczneHasło123!{enter}')

		cy.get('li[data-testid="logout"]').click()
		cy.get('li[data-testid="login"]').should('be.visible')
		cy.get('li[data-testid="register"]').should('be.visible')
	})

})
