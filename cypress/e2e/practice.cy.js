/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
const urlApi=  'https://practice.expandtesting.com/notes/api/notes/'
//le token a généré sur votre compte
const token = 'your private token'
const titre =  faker.person.jobTitle()
const descrip = faker.person.jobDescriptor()
const optionUrl = {
    method: 'GET', 
    url: urlApi, 
    headers:{
        'x-auth-token': token
    }
}

describe('Test suite api practice', ()=>{

  it('should ceate note successfully', ()=>{
//requete pour créer une note
  cy.request({
    ...optionUrl,
    method: 'POST', 
    body:{
        title: titre, 
        description: descrip, 
        category: 'Home'
    }
  }).then(response=>{
    expect(response.status).to.eq(200)
    expect(response.body.data.title).to.eq(titre)
    console.log(response)
  })

  })

  it('should get all note', ()=>{
    //une requete pour afficher toutes les notes
    cy.request(optionUrl).then(response =>{
        expect(response.status).to.eq(200)
    
        //boucler sur l'objet data pour vérifier que les ids ne sont pas null
        Cypress._.each(response.body.data,(data)=>{
            expect(data.id).to.be.not.null
        })
    })
  })

  it('should get note by id', ()=>{
    //une requete pour afficher l'id de la deuxieme note
   cy.request(optionUrl).then(response=>{
    expect(response.status).to.eq(200)
    //stocker l'id de la deuxieme note dans la const idNote
    const idNote = response.body.data[1].id
//une requte pour afficher la deuxieme note avec lid recupéré dans la requte precedente
    cy.request({
       ...optionUrl,
       url:  urlApi+idNote 

    }).then(response=>{
        console.log(response)
      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(idNote)
      //vérifier la presence de toutes les clés de l'objet data
      expect(response.body.data).to.have.all.keys('id', 'title', 'description', 'category', 'completed', 'created_at', 'updated_at', 'user_id')
    })



   })

  })

})