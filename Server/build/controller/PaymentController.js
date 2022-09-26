"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeCheckout = void 0;
require("dotenv").config({ path: "./.env" });
const KEY = process.env.YOUR_STRIPE_KEY;
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51LfFLNSBtcTewsRo5BB4XJROjuppDXcD2DWmqIaw4kPEXpTObKdHD6g13mk1mNExFqdkQexfCFK3Skqq5OK0bptx00nxjWm0XT");
class stripeCheckout {
    constructor() {
        this.payment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { cartItems } = req.body;
            const line_items = cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.title,
                            images: [item.img],
                            description: item.desc,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                };
            });
            console.log("cart:", line_items);
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                shipping_address_collection: {
                    allowed_countries: ['US', 'CA'],
                },
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: {
                                amount: 0,
                                currency: 'inr',
                            },
                            display_name: 'Free shipping',
                            // Delivers between 5-7 business days
                            delivery_estimate: {
                                minimum: {
                                    unit: 'business_day',
                                    value: 5,
                                },
                                maximum: {
                                    unit: 'business_day',
                                    value: 7,
                                },
                            }
                        }
                    },
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: {
                                amount: 1500,
                                currency: 'inr',
                            },
                            display_name: 'Next day air',
                            // Delivers in exactly 1 business day
                            delivery_estimate: {
                                minimum: {
                                    unit: 'business_day',
                                    value: 1,
                                },
                                maximum: {
                                    unit: 'business_day',
                                    value: 1,
                                },
                            }
                        }
                    },
                ],
                phone_number_collection: {
                    enabled: true
                },
                line_items,
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}/checkout-success`,
                cancel_url: `${process.env.CLIENT_URL}/cart`,
            });
            res.send({ url: session.url });
        });
    }
}
exports.stripeCheckout = stripeCheckout;
//# sourceMappingURL=PaymentController.js.map