/// <reference types="Cypress" />

describe('Formulário de Contato', () => {
  beforeEach(() => {
    cy.visit('https://my-from.vercel.app/');
  });

  it('Deve validar o titulo do formulário', () => {
    cy.title().should('be.equal', 'Formulário de Contato')
  });

  it('Deve validar os campos do formulário', () => {
    cy.contains('Primeiro Nome').should('be.visible')
    cy.contains('Sobrenome').should('be.visible')
    cy.contains('Telefone').should('be.visible')
    cy.contains('E-mail').should('be.visible')
  });

  it('Deve verificar se os campos estão vazios', () => {
    cy.get('#firstName').should('not.have.value')
    cy.get('#lastName').should('not.have.value')
    cy.get('#phone').should('not.have.value')
    cy.get('#email').should('not.have.value')
    cy.get('#message').should('not.have.value')
  });

  it('Preencher todos os campos corretamente e enviar o formulário com sucesso', () => {
    // Preencher os campos corretamente
    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Testando')
    cy.get('#phone').type('1234567890')
    cy.get('#email').type('teste.testando@example.com')
    cy.get('#message').type('Teste de mensagem')
    // Fazer o envio do formulário
    cy.get('#submitBtn').click()
    // Verificar se a mensagem de sucesso é exibida
    cy.get('#successMessage').should('be.visible')
  });

  it('Preencher o campo de mensagem com mais de 500 caracteres e tentar enviar o formulário', () => {
    // Preencher o campo de mensagem com mais de 500 caracteres
    const longText = 'Apenas testando a inserção de mensagem a qual utilize a quantidade máxima de caracteres';
    const repeatedText = longText.repeat(10)

    cy.get('#firstName').type('Teste')
    cy.get('#lastName').type('Testando')
    cy.get('#phone').type('1234567890')
    cy.get('#email').type('teste.testando@example.com')
    cy.get('#message').type(repeatedText);
    // Fazer o envio do formulário
    cy.get('#submitBtn').click()
    // Verificar se a mensagem de sucesso é exibida para o campo de mensagem
    cy.get('#successMessage').should('be.visible')
  });

  it('Enviar um anexo junto com o formulário', () => {
    // Adicionar um arquivo para o campo de anexo
    cy.get('input[type="file"]')  // fiz um get para localizar um input do tipo "file"
    .should('not.have.value') // fiz uma validação se esse campo estava vazio e estava
    .selectFile('./cypress/fixtures/AnselmoSantos.pdf')  // utilizei esse comando para selecionar um arquivo do meu próprio arquivo de códigos aqui no vscode
    .should(function($imput) {
        expect($imput[0].files[0].name).to.equal('AnselmoSantos.pdf')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function() {

    cy.get('input[type="file"]')  // fiz um get para localizar um input do tipo "file"
        .should('not.have.value') // fiz uma validação se esse campo estava vazio e estava
        .selectFile('./cypress/fixtures/AnselmoSantos.pdf', {action: 'drag-drop' })  // utilizei esse comando para "arrastar" um arquivo do meu próprio arquivo de códigos aqui no vscode
        .should(function($imput) {
        expect($imput[0].files[0].name).to.equal('AnselmoSantos.pdf')
            // o comando acima, foi utilizado para verificar se o arquivo que foi inserido é igual ao nome "example.json"

    })
})
});
