var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const supertest = require('supertest');
const app = require('../index');
describe('product', () => {
    describe('get product route', () => {
        describe('given the product does not exist', () => {
            it('should return a 404', () => __awaiter(this, void 0, void 0, function* () {
                const id = 'product-123';
                yield supertest(app).get(`/products/find/${id}`).expect(404);
            }));
        });
    });
});
//# sourceMappingURL=product.test.js.map