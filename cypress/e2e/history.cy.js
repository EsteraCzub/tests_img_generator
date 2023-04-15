import {mockDefaultRoutes} from "../support/mock";

describe('history module', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.visit('http://localhost:8080/history')
	})

	it('display the history', () => {
		//ToDo: Write test
	})

	it('display details on the image', () => {
		//ToDo: Write test
	})

})
