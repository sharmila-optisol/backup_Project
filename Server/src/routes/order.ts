import {Router} from 'express'
import {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken} from '../Middleware/VerifyToken'
import { orderController } from '../controller/OrderController';
const OrderController = new orderController();

const router =Router();
//CREATE

router.post("/",verifyToken, OrderController.createOrder);
//UPDATE

router.put('/:id',verifyTokenAndAdmin,OrderController.updateOrder);
// //DELETE

router.delete('/:id',verifyTokenAndAdmin,OrderController.deleteOrder);
// //GET USER ORDERS

router.get('/find/:id',verifyTokenAndAuthorization,OrderController.getUserOrder);
// GET ALL ORDERS

router.get('/',verifyTokenAndAdmin,OrderController.getAllOrder);


export default router;