/// <reference types="cypress"/>
const index = Math.floor(Math.random() * (99 - 0) + 1)
describe('Test suite api Jsonplaceholder', () => {
  it('should get all post', () => {
   
 cy.request({ 
  method:'GET', 
  url:'https://jsonplaceholder.typicode.com/posts'
}).then(res=>{
 
 //Vérifier le status de la réponse 
 expect(res.status).to.eq(200)
 expect(res.status).be.ok
 //vérifier le type réponse 
 expect(res).to.be.an('object')
 expect(res.body).to.be.an('array').that.is.not.empty
//vérifier la taille de l'objet body
 expect(res.body).to.have.length(100)
 expect(res.body.length).above(50)
 //vérifier les propietes du premier element du body
 expect(res.body[0]).to.have.property('id')
 expect(res.body[0]).to.have.property('title')
//vérifier l'id du deuxieme element est un nombre
 expect(res.body[1].id).to.be.an('number')
 expect(res.body[1].title).to.be.an('string')
 expect(res.body[1].id).not.null
 expect(res.body[1].title).to.include('qui est')
 expect(res.body[1].title).to.eq('qui est esse')

 cy.log(res)
 })
})

it('should get post by id', ()=>{

  cy.request({ 
    method:'GET', 
    url:'https://jsonplaceholder.typicode.com/posts/40'
  }).then(response=>{

    expect(response.status).to.eq(200)
    expect(response.status).be.ok
    expect(response).to.be.an('object').that.is.not.empty
    expect(response.body).to.have.property('id')
    expect(response.body.id).to.eq(40)
    expect(response.body.title).to.eq("enim quo cumque")
    console.log(response)
  })

  })

  it('should get post by random id', ()=>{

    cy.request({ 
      method:'GET', 
      url:`https://jsonplaceholder.typicode.com/posts/${index}`
    }).then(response=>{
  
      expect(response.status).to.eq(200)
      expect(response.status).be.ok
      expect(response).to.be.an('object').that.is.not.empty
      expect(response.body).to.have.property('id')
      expect(response.body.id).to.eq(index)
   
      cy.log(response.body.title)
      console.log(response)
    })
  
    })
  
})


