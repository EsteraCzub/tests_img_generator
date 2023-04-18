import {mockDefaultRoutes} from "../support/mock";

describe('profile', () => {
	beforeEach(() => {
		mockDefaultRoutes()
		cy.visit('http://localhost:8080/profile')
	})

	it('check user', () => {
		cy.get('div[data-testid="user"] > .ant-card-body > .ant-card-meta > .ant-card-meta-avatar')
			.children()
			.should('have.class', 'ant-avatar-icon')

		cy.get('div[data-testid="user"] > .ant-card-body > .ant-card-meta > .ant-card-meta-detail')
			.children()
			.first()
			.should('have.text', 'me')

		cy.get('div[data-testid="user"] > .ant-card-body > .ant-card-meta > .ant-card-meta-detail')
			.children()
			.first()
			.next()
			.should('have.text', 'Web Developer')
	})

	it('check followers', () => {
		cy.get('div[data-testid="followers"] > .ant-statistic > .ant-statistic-title')
			.should('have.text', 'Followers')

		cy.get('div[data-testid="followers"] > .ant-statistic > .ant-statistic-content')
			.children()
			.should('have.text', '123')
	})

	it('check following', () => {
		cy.get('div[data-testid="following"] > .ant-statistic > .ant-statistic-title')
			.should('have.text', 'Following')

		cy.get('div[data-testid="following"] > .ant-statistic > .ant-statistic-content')
			.children()
			.should('have.text', '456')
	})

	it('check user data', () => {
		cy.get('p[data-testid="email"]')
			.should('have.text', 'Email: john.doe@example.com')

		cy.get('p[data-testid="phone"]')
			.should('have.text', 'Phone: +1 555-1234')

		cy.get('p[data-testid="address"]')
			.should('have.text', 'Address: 123 Main St, Anytown, USA')
	})

	it('check click', () => {
		cy.get('div[data-testid="clickCount"] > .ant-card-body')
			.should('contain.text', 'Clicked 10 times')

		cy.get('button[data-testid="clickButton"]').click()

		cy.get('div[data-testid="clickCount"] > .ant-card-body')
			.should('contain.text', 'Clicked 11 times')
	})

	it('check time', () => {
		const dayjs = require('dayjs')

		const currentDate = dayjs().format('DD.MM.YYYY')
		const currentTime = dayjs().format('hh:mm:ss')
		
		cy.get('div[data-testid="timer"] > .ant-card-body')
			.should('contain.text', 'Current time: ')
			.and('contain.text', currentDate)
			.and('contain.text', currentTime)
	})
})
