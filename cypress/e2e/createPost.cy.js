/// <reference types="cypress"/>
describe('Test suite api', ()=>{


    it('should create a post',()=>{
      cy.request({
        method: 'POST', 
        url: 'https://jsonplaceholder.typicode.com/posts', 
        body:{
            title: 'mon poste', 
            body: 'le corps de mon post', 
            userId: 400
        }
      }).then(respone=>{
        expect(respone.status).to.eq(201)
        expect(respone).to.be.an('object').that.is.not.empty
        expect(respone.body.title).to.eq('mon poste')
        expect(respone.body.body).to.eq('le corps de mon post')
        expect(respone.body.userId).to.eq(400)
      })


    })



})