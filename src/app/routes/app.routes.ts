import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BrandRoutes } from '../modules/brand/brand.route'
import { CategoryRoutes } from '../modules/category/category.route'
import { ColorRoutes } from '../modules/colors/color.route'
import { CurrencyTypeRoutes } from '../modules/currencyType/currencyType.route'
import { CustomerPaymentRoutes } from '../modules/customerPayments/customerPayments.route'
import { CustomerRoutes } from '../modules/customers/customers.route'
import { DiscountRoutes } from '../modules/discounts/discount.route'
import { PayInSupplierRoutes } from '../modules/payInSupplier/payInSupplier.route'
import { productRoutes } from '../modules/products/product.route'
import { PurchaseRoutes } from '../modules/purchase/purchase.route'
import { PurchaseGroupRoutes } from '../modules/purchaseGroup/purchaseGroup.route'
import { ReturnRoutes } from '../modules/returns/return.route'
import { SellRoutes } from '../modules/sell/sell.route'
import { SellGroupRoutes } from '../modules/sellGroup/sellGroup.route'
import { SellVariantRoutes } from '../modules/sellVariants/sellVariants.route'
import { SupplierRoutes } from '../modules/supplier/supplier.route'
import { SupplierPaymentRoutes } from '../modules/supplierPayments/supplierPayment.route'
import { SupplierSellRoutes } from '../modules/supplierSell/supplierSell.route'
import { SupplierSellProductRoutes } from '../modules/supplierSellProduct/supplierSellProduct.route'
import { SupplierSellVariantsRoutes } from '../modules/supplierSellVariants/supplierSellVariant.route'
import { UnitRoutes } from '../modules/unit/unit.route'
import { UserRoutes } from '../modules/users/user.route'
import { VariantRoutes } from '../modules/variants/variants.route'
import { VatRoutes } from '../modules/vats/vats.route'

const router = express.Router()

const modulesRouters = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/variant',
    route: VariantRoutes,
  },
  {
    path: '/purchase',
    route: PurchaseRoutes,
  },
  {
    path: '/supplier',
    route: SupplierRoutes,
  },
  {
    path: '/supplier-payment',
    route: SupplierPaymentRoutes,
  },
  {
    path: '/customer',
    route: CustomerRoutes,
  },
  {
    path: '/sell',
    route: SellRoutes,
  },
  {
    path: '/sell-variant',
    route: SellVariantRoutes,
  },
  {
    path: '/return',
    route: ReturnRoutes,
  },
  {
    path: '/customer-payment',
    route: CustomerPaymentRoutes,
  },
  {
    path: '/color',
    route: ColorRoutes,
  },
  {
    path: '/currency-type',
    route: CurrencyTypeRoutes,
  },
  {
    path: '/discount',
    route: DiscountRoutes,
  },
  {
    path: '/vat',
    route: VatRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/unit',
    route: UnitRoutes,
  },
  {
    path: '/brand',
    route: BrandRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/supplier-sell',
    route: SupplierSellRoutes,
  },
  {
    path: '/supplier-sell-variants',
    route: SupplierSellVariantsRoutes,
  },
  {
    path: '/supplier-sell-products',
    route: SupplierSellProductRoutes,
  },
  {
    path: '/purchase-group',
    route: PurchaseGroupRoutes,
  },
  {
    path: '/sell-group',
    route: SellGroupRoutes,
  },
  {
    path: '/pay-in-supplier',
    route: PayInSupplierRoutes,
  },
]

modulesRouters.forEach(route => {
  router.use(route.path, route.route)
})

export default router
