import express from 'express'
import { CustomerRoutes } from '../modules/customers/customers.route'
import { productRoutes } from '../modules/products/product.route'
import { PurchaseRoutes } from '../modules/purchase/purchase.route'
import { SellRoutes } from '../modules/sell/sell.route'
import { SellVariantRoutes } from '../modules/sellVariants/sellVariants.route'
import { SupplierRoutes } from '../modules/supplier/supplier.route'
import { SupplierPaymentRoutes } from '../modules/supplierPayments/supplierPayment.route'
import { UserRoutes } from '../modules/users/user.route'
import { VariantRoutes } from '../modules/variants/variants.route'

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
]

modulesRouters.forEach(route => {
  router.use(route.path, route.route)
})

export default router
