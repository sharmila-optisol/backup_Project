import {Router} from 'express'
import {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken} from '../Middleware/VerifyToken'
import { productController } from '../controller/ProductController';
const ProductController = new productController();

const router =Router();
//CREATE

router.post("/", verifyTokenAndAdmin, ProductController.createProduct);
//UPDATE

router.put('/:id',verifyTokenAndAdmin, ProductController.updateProduct);
// //DELETE

router.delete('/:id',verifyTokenAndAdmin,ProductController.deleteProduct);
// //GET PRODUCT
router.get('/find/:id',ProductController.getProduct);
// //GET ALL PRODUCT

router.get('/',ProductController.getAllProduct);
//search

router.get("/search",ProductController.search);
//GET REVIEW

router.post("/:id/review",ProductController.review);

export default router;