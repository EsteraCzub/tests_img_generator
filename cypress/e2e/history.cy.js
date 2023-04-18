import {mockDefaultRoutes} from "../support/mock";

describe('history module', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.visit('http://localhost:8080/history')
	})

	it('display the history', () => {
		cy.get('div').should('have.class', 'ant-list-split')
	})

	it('display details on the image', () => {
		cy.get('img').first().click()
		cy.get('div[data-testid="imgDiv"]').should('be.visible')

		cy.get('img[data-testid="openImg"]').should('have.css', 'width', '512px')
		cy.get('img[data-testid="openImg"]').should('have.css', 'height', '512px')

		cy.get(':nth-child(2) > .ant-descriptions-item-content')
		.should('have.text', 'portrait of a beautiful girl with scorpions around her, slight smile, digital painting, concept art, sharp focus, illustration, au naturel, hyper detailed, digital art, trending in artstation, cinematic lighting, studio quality, smooth render, unreal engine 5')

		cy.get(':nth-child(4) > :nth-child(1) > span').should('have.text', '512x512')

		cy.get(':nth-child(4) > :nth-child(2) > span').should('have.text', '10')
		
		cy.get(':nth-child(4) > :nth-child(3) > span').should('have.text', '7.5')
		
		cy.get(':nth-child(4) > :nth-child(4) > span').should('have.text', '985117537')
		
		cy.get(':nth-child(4) > :nth-child(5) > span').should('have.text', 'stable_tf')

		cy.get('div[data-testid="imgDiv"]').click()
	})

})
