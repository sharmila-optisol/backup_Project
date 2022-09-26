import {Router} from 'express'
import {Cart} from '../models/Cart'
import {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken} from '../Middleware/VerifyToken'
import { cartController } from '../controller/CartController';
const CartController = new cartController();

const router =Router();
//CREATE

router.post('/',verifyToken,CartController.createCart)
//UPDATE

router.put('/:id',verifyTokenAndAuthorization,CartController.updateCart);
// //DELETE

router.delete('/:id',verifyTokenAndAuthorization,CartController.deleteCart)
// //GET USER CART

router.get('/find/:userId',verifyTokenAndAuthorization,CartController.getUserCart)
//GET ALL 

router.get('/',verifyTokenAndAdmin,CartController.getAllCart);

export default router;