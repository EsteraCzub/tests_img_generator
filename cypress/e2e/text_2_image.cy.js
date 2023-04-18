import {mockDefaultRoutes} from "../support/mock";

describe('text2image module', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.visit('http://localhost:8080/text2image')
	})

	it('disaplay text 2 image form', () => {
		cy.get('div[data-testid="mode"] > .ant-select-selector')
			.children()
			.next()
			.should('have.text', 'Stable diffusion TF')

		cy.get('div[data-testid="model"] > .ant-select-selector')
			.children()
			.next()
			.should('not.contain.text')

		cy.get('textarea[data-testid="negative"]')
			.should('not.contain.text')

		cy.get('div[data-testid="imageSize"] > .ant-select-selector')
			.children()
			.next()
			.should('have.text', '512x512')

		cy.get('div[data-testid="steps"]')
			.find('.ant-slider-handle')
			.should('have.attr', 'aria-valuenow', '10')

		cy.get('div[data-testid="guidanceScale"]')
			.find('.ant-slider-handle')
			.should('have.attr', 'aria-valuenow', '7.5')

		cy.get('input[data-testid="seed"]')
			.should('have.attr', 'disabled')

		cy.get('button[data-testid="seedSwitch"]').click()

		cy.get('input[data-testid="seed"]')
			.should('not.have.attr', 'disabled')
	})

	it('submit the image form', () => {
		cy.wait('@getStatus')

		cy.get('textarea[data-testid="negative"]')
		   .clear()
		   .type('No decidous trees')
		
		cy.get('textarea[data-testid="prompt"]')
			.clear()
			.type('Forest with fog and rais of the sun')

		cy.get('button[data-testid="seedSwitch"]')
			.click()

		cy.get('input[data-testid="seed"]')
			.clear()
			.type('111222333')
	 
		cy.get('button[data-testid="createButton"]')
		   .click()
	 
		cy.wait('@getAddTask')
		   .should(({request, response}) => {
			  const req = request.body
			  expect(req.prompt).equal('Forest with fog and rais of the sun')
			  expect(req.negative).equal('No decidous trees')
			  expect(req.seed).equal('111222333')
		   })		
	})


	it('submit the image form and get 500 error from backend', () => {
		cy.wait('@getStatus')

		cy.get('textarea[data-testid="negative"]')
			.clear()
			.type('No decidous trees')
		
		cy.get('textarea[data-testid="prompt"]')
			.clear()
			.type('Forest with fog and rais of the sun')

		cy.get('button[data-testid="seedSwitch"]')
			.click()

		cy.get('input[data-testid="seed"]')
			.clear()
			.type('111222333')
	 
		cy.intercept(
			'POST',
			'**/add_task*',
			{
				statusCode: 500,
				body: {status: 500, message: "Service error"}
			}
		).as('getAddTaskWith500')
			   
		cy.get('button[data-testid="createButton"]')
		   .click()
		
		cy.get('div[data-testid="alertError"]')
		   .should('be.visible')
		   .children()
		   .next()
		   .children()
		   .should('have.text', 'Request failed with status code 500')
	})
})
	

	
