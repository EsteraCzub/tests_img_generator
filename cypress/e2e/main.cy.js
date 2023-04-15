import {mockDefaultRoutes} from "../support/mock";

describe('main window test', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.viewport('macbook-13')
		cy.visit('http://localhost:8080/')
	})

	it('test the register box', () => {
		//ToDo: Write test
	})

	//ToDo: test the login box
	// it('test the login box', () => {
	// })

	//ToDo: test the modules section
	// it('test the modules section', () => {
	// })

})
