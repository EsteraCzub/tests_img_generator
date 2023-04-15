import {mockDefaultRoutes} from "../support/mock";

describe('profile', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.visit('http://localhost:8080/profile')
	})

	it('display profile data', () => {
		//ToDo: Write test
	})

})
