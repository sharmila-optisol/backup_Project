import * as express from "express"
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as cors from 'cors'
import route from './routes/index'


const path = require('path');
dotenv.config({ path: path.resolve(__dirname, './.env') });
//establish the database connection.
 export const app:express.Application=express();

const port= 4000 || +process.env.PORT;

mongoose.connect(process.env.DATABASE_URL).then(()=>
console.log("db connetion sucpcessful")).catch((err)=>{
    console.log(err);
}); 
app.use(express.json())
app.use(cors());
app.use(route)


app.use((req: express.Request, res: express.Response, next) => {
    console.log("Middle Ware");
    next();
  });
  
app.listen(port,():void=>{
    console.log("backend is running" +port);
})





