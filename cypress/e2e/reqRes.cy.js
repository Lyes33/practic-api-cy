describe('Test suite api req res', ()=>{

 
    it('should get all users', ()=>{

    cy.request({
        method:'GET', 
        url:'https://reqres.in/api/users?page=2'
    }).then(response=>{

       expect(response.status).to.eq(200)
       expect(response.body.page).to.eq(2)
       expect(response.body.data).not.null
       expect(response.body.data[0].id).to.eq(7)
    })
    })

    it('should create user', ()=>{

        cy.request({
            method: 'POST', 
            url: 'https://reqres.in/api/users', 
            body:{
                name: 'monuser', 
                job: 'testeur'
            }
        }).then(response=>{
            expect(response.status).to.eq(201)
            expect(response.body.id).not.null
            expect(response.body.name).to.eq('monuser')
            expect(response.body.job).to.eq('testeur')
        })
    })

    it('should update user', ()=>{
        cy.request({
            method: 'PUT', 
            url: 'https://reqres.in/api/users/2',
            body:{
                name: 'userupdate',
                job: 'chomeur'
            }
        }).then(response=>{

            expect(response.status).to.eq(200)
            expect(response.body.id).not.null
            expect(response.body.name).to.eq('userupdate')
            expect(response.body.job).to.eq('chomeur')
            expect(response.body).to.have.property('updatedAt')

        })
    })

})