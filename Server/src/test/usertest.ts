import * as chai from "chai";
import { expect } from "chai";
import chaiHttp = require("chai-http");

// import { server } from "../index";
const server = 'http://localhost:4000'
chai.should();
chai.use(chaiHttp);
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTZlZjhkNGRlMTQ5OWU0ZjkyOTQ5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDE2MjI3OSwiZXhwIjoxNjY1MDI2Mjc5fQ.Blmj3M0NBVAD9nxwZSB_Izu_gIK80kiq2UhrECkAMeo"

describe("GET  Api", () => {
    /*** Test GET Route */
       const id = "631ac83f1ff334cdfdaae75b";
      describe("GET /category/getcategory", () => {
      it("It should GET All Category data", (done) => {
       chai.request(server)
       .get(`/users/find/${id}`).set("token", "Bearer " + token)
       .end((err, response) => {
       expect(response).have.status(200);
       expect(response.body).to.be.a("object");
     expect(response.body).to.have.property("email"); 
       expect(response.body).to.have.property("_id");
       done();
        });
     });
    });
    });
    /**TEST THE GET (by id) route */
describe("GET All Api",()=>{
    it("It should GET all the task",(done)=>{
      chai.request(server)
      .get("/users/").set("token", "Bearer " + token)
      .end((err,response)=>{
        expect(response).have.status(200);
        expect(response.body).to.be.a("array");
        done();
      })
    })
  });

  /**Test the POST route */
describe('POST/Api',()=>{
    const id = "631ac83f1ff334cdfdaae75b";
    it("it should post a new task",(done)=>{
      chai.request(server)
      .post(`/users/${id}`)
      .set("token", "Bearer " + token)
      .send({
        username: "balaji",
        email: "balajikrishna44589@gmail.com",
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
              done();
              })        
  
  });
  });
  
  // /**Test the put route */
describe('PUT/Api',()=>{
    const id = "632d9c3defbb5e2ac74302ac";
    it("it should post a new task",(done)=>{
      chai.request(server)
      .put(`/products/${id}`)
      .set("token", "Bearer " + token)
      .send({
        username: "balaji",
        email: "balajikrishna44589@gmail.com",
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
              done();
              })        
  
  });
  });

  describe("delete Api", () => {
    /*** Test GET Route */
    const id = "632d9c3defbb5e2ac74302ac";
      describe("GET /category/getcategory", () => {
      it("It should GET All Category data", (done) => {
       chai.request(server)
       .delete(`/users/${id}`).set("token", "Bearer " + token)
       .send({
        username: "balaji",
        email: "balajikrishna44589@gmail.com",
      })
       .end((err, response) => {
       expect(response).have.status(200);
       expect(response.body).to.be.a("array");
       expect(response.body).to.have.property("_id");
       done();
        });
     });
    });
    });