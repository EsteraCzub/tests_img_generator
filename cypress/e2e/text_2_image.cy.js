import {mockDefaultRoutes} from "../support/mock";

describe('text2image module', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.visit('http://localhost:8080/text2image')
	})

	it('disaplay text 2 image form', () => {
		//ToDo: Write test
	})

	it('submit the image form', () => {
		//ToDo: Write test
	})

	it('submit the image form and get 500 error from backend', () => {
		//ToDo: Write test
	})
})
