import * as express from "express"
import userRoutes from '../routes/user'
import authRoute from '../routes/auth'
import productRoutes from '../routes/product'
import cartRoutes from '../routes/cart'
import orderRoutes from '../routes/order'
import stripe from '../routes/stripe'

const app=express();
app.use(express.json())
app.use(authRoute);
app.use("/users",userRoutes);
app.use("/products",productRoutes);
app.use("/carts",cartRoutes);
app.use("/orders",orderRoutes);
app.use("/stripe",stripe);

export default app;