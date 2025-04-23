import { AddToCart } from '@prisma/client'
import prisma from '../../../../shared/prisma'
import { IAddToCart } from './addToCart.type'

// Create or update (or remove) from cart
const CreateAddToCartService = async (payloads: IAddToCart) => {
  const { productId, customerId } = payloads

  const { removeProduct, ...remainingProduct } = payloads

  const existingCartItem = await prisma.addToCart.findFirst({
    where: {
      productId,
      customerId,
    },
  })

  if (existingCartItem) {
    if (removeProduct) {
      // যদি রিমুভ করতে চায়
      if (existingCartItem.quantity <= 1) {
        // quantity যদি 1 বা তার কম হয়, তাহলে cart item delete করে দাও
        await prisma.addToCart.delete({
          where: {
            id: existingCartItem.id,
          },
        })
        return { message: 'Product removed from cart' }
      } else {
        // quantity 1 এর বেশি, তাহলে quantity কমাও
        const updatedCartItem = await prisma.addToCart.update({
          where: {
            id: existingCartItem.id,
          },
          data: {
            quantity: existingCartItem.quantity - 1,
            updatedAt: new Date(),
          },
        })
        return updatedCartItem
      }
    } else {
      // নতুন করে যোগ করতে চায়, quantity বাড়াও
      const updatedCartItem = await prisma.addToCart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
          updatedAt: new Date(),
        },
      })

      return updatedCartItem
    }
  } else {
    // যদি cart-এ না থাকে এবং remove চায়, তাহলে কিছু করো না
    if (removeProduct) {
      return { message: 'Product not found in cart' }
    }

    // নতুন প্রোডাক্ট যোগ করো
    const newCartItem = await prisma.addToCart.create({
      // @ts-ignore
      data: {
        ...remainingProduct,
        quantity: 1,
      },
    })

    return newCartItem
  }
}

// Get all add to cart service
const GetAllAddToCartService = async (): Promise<AddToCart[] | null> => {
  const product = await prisma.addToCart.findMany({
    include: {
      product: true,
      // customer: true,
    },
  })

  return product
}

export const AddToCartService = {
  CreateAddToCartService,
  GetAllAddToCartService,
}
