"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdditionalExpenses_route_1 = require("../modules/additionalExpenses/AdditionalExpenses.route");
const additionalMoneyBack_route_1 = require("../modules/additionalMoneyBack/additionalMoneyBack.route");
const auth_route_1 = require("../modules/auth/auth.route");
const brand_route_1 = require("../modules/brand/brand.route");
const category_route_1 = require("../modules/category/category.route");
const color_route_1 = require("../modules/colors/color.route");
const currencyType_route_1 = require("../modules/currencyType/currencyType.route");
const customerPayInUser_router_1 = require("../modules/customerPayInUser/customerPayInUser.router");
const customerPayments_route_1 = require("../modules/customerPayments/customerPayments.route");
const customerPurchase_route_1 = require("../modules/customerPurchase/customerPurchase.route");
const customers_route_1 = require("../modules/customers/customers.route");
const discount_route_1 = require("../modules/discounts/discount.route");
const payInSupplier_route_1 = require("../modules/payInSupplier/payInSupplier.route");
const product_route_1 = require("../modules/products/product.route");
const purchase_route_1 = require("../modules/purchase/purchase.route");
const purchaseGroup_route_1 = require("../modules/purchaseGroup/purchaseGroup.route");
const returnGroup_route_1 = require("../modules/returnGroup/returnGroup.route");
const return_route_1 = require("../modules/returns/return.route");
const sell_route_1 = require("../modules/sell/sell.route");
const sellGroup_route_1 = require("../modules/sellGroup/sellGroup.route");
const supplier_route_1 = require("../modules/supplier/supplier.route");
const supplierPayment_route_1 = require("../modules/supplierPayments/supplierPayment.route");
const supplierReturnPayments_route_1 = require("../modules/supplierReturnPayments/supplierReturnPayments.route");
const supplierSell_route_1 = require("../modules/supplierSell/supplierSell.route");
const supplierSellProduct_route_1 = require("../modules/supplierSellProduct/supplierSellProduct.route");
const supplierSellVariant_route_1 = require("../modules/supplierSellVariants/supplierSellVariant.route");
const unit_route_1 = require("../modules/unit/unit.route");
const user_route_1 = require("../modules/users/user.route");
const variants_route_1 = require("../modules/variants/variants.route");
const vats_route_1 = require("../modules/vats/vats.route");
const router = express_1.default.Router();
const modulesRouters = [
    {
        path: '/user',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/product',
        route: product_route_1.productRoutes,
    },
    {
        path: '/variant',
        route: variants_route_1.VariantRoutes,
    },
    {
        path: '/purchase',
        route: purchase_route_1.PurchaseRoutes,
    },
    {
        path: '/supplier',
        route: supplier_route_1.SupplierRoutes,
    },
    {
        path: '/supplier-payment',
        route: supplierPayment_route_1.SupplierPaymentRoutes,
    },
    {
        path: '/customer',
        route: customers_route_1.CustomerRoutes,
    },
    {
        path: '/sell',
        route: sell_route_1.SellRoutes,
    },
    {
        path: '/return',
        route: return_route_1.ReturnRoutes,
    },
    {
        path: '/customer-payment',
        route: customerPayments_route_1.CustomerPaymentRoutes,
    },
    {
        path: '/color',
        route: color_route_1.ColorRoutes,
    },
    {
        path: '/currency-type',
        route: currencyType_route_1.CurrencyTypeRoutes,
    },
    {
        path: '/discount',
        route: discount_route_1.DiscountRoutes,
    },
    {
        path: '/vat',
        route: vats_route_1.VatRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/unit',
        route: unit_route_1.UnitRoutes,
    },
    {
        path: '/brand',
        route: brand_route_1.BrandRoutes,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoutes,
    },
    {
        path: '/supplier-sell',
        route: supplierSell_route_1.SupplierSellRoutes,
    },
    {
        path: '/supplier-sell-variants',
        route: supplierSellVariant_route_1.SupplierSellVariantsRoutes,
    },
    {
        path: '/supplier-sell-products',
        route: supplierSellProduct_route_1.SupplierSellProductRoutes,
    },
    {
        path: '/purchase-group',
        route: purchaseGroup_route_1.PurchaseGroupRoutes,
    },
    {
        path: '/sell-group',
        route: sellGroup_route_1.SellGroupRoutes,
    },
    {
        path: '/pay-in-supplier',
        route: payInSupplier_route_1.PayInSupplierRoutes,
    },
    {
        path: '/customer-purchase',
        route: customerPurchase_route_1.CustomerPurchaseRoutes,
    },
    {
        path: '/customer-pay-in-user',
        route: customerPayInUser_router_1.CustomerPayInUserRoutes,
    },
    {
        path: '/return-group',
        route: returnGroup_route_1.ReturnGroupRoutes,
    },
    {
        path: '/supplier-return-payment',
        route: supplierReturnPayments_route_1.SupplierReturnPaymentsRoutes,
    },
    {
        path: '/additional-money-back-to-user',
        route: additionalMoneyBack_route_1.AdditionalMoneyBackRoutes,
    },
    {
        path: '/additional-expense',
        route: AdditionalExpenses_route_1.AdditionalExpensesRoutes,
    },
];
modulesRouters.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
