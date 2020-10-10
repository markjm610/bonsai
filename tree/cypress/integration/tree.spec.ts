/// <reference types="Cypress" />

describe('The home page', () => {
    it('successfully loads', () => {
        cy.visit('/')
    })
})

describe('The tree', () => {
    it('can be cleared with the start over button', () => {
        cy.visit('/')
        cy.get('.start-over-button').click()
    })
})

describe('The insert form', () => {
    it('can add a node', () => {
        cy.visit('/')
        cy.get('.value-input').type('90')
        cy.get('.add-node-button').click()
        cy.get('.leaf').contains('90')
    })

    // it('will not add a node past four levels', () => {
    //     cy.visit('/')
    //     const input = cy.get('.value-input')
    //     input.type('90')
    //     const button = cy.get('.add-node-button')
    //     button.click()
    //     input.type('90')
    //     button.click()
    // })

})


