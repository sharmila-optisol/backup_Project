import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");

// import { server } from "../index";                 
const server = 'http://localhost:4000'
chai.should();
chai.use(chaiHttp);
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTZlZjhkNGRlMTQ5OWU0ZjkyOTQ5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDE2MjI3OSwiZXhwIjoxNjY1MDI2Mjc5fQ.Blmj3M0NBVAD9nxwZSB_Izu_gIK80kiq2UhrECkAMeo"

describe("GET order All Api", () => {
    /*** Test GET Route */
      describe("GET /category/getcategory", () => {
      it("It should GET All Category data", (done) => {
       chai.request(server)
       .get("/orders/").set("token", "Bearer " + token)
       .end((err, response) => {
       expect(response).have.status(200);
       expect(response.body).to.be.a("array");
       done();
        });
     });
    });
    });

    describe("GET order Api", () => {
        /*** Test GET Route */
           const id = "62f33eb8483981a258b21902";
          describe("GET /category/getcategory", () => {
          it("It should GET All Category data", (done) => {
           chai.request(server)
           .get(`/orders/find/${id}`).set("token", "Bearer " + token)
           .end((err, response) => {
           expect(response).have.status(200);
           expect(response.body).to.be.a("array");
           done();
            });
         });
        });
        });

          // /**Test the put route */
describe('PUT/Api',()=>{
    const id = "6304c537ca7def1c183f01fe"
    it("it should post a new task",(done)=>{
      chai.request(server)
      .put(`/orders/${id}`)
      .set("token", "Bearer " + token)
      .send({
        productId: "111",
        quantity: "1",
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
              done();
              })        
  
  });
  });
  describe("delete Api", () => {
    /*** Test DELETE Route */
    const id = "6304c537ca7def1c183f01fe";
      describe("GET /category/getcategory", () => {
      it("It should GET All Category data", (done) => {
       chai.request(server)
       .delete(`/orders/${id}`).set("token", "Bearer " + token)
       .end((err, response) => {
       expect(response).have.status(200);
       expect(response.body).to.be.a("array");
       done();
        });
     });
    });
    });                                    