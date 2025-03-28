import prisma from '../shared/prisma'

// Generate user id
export async function generateUniqueId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.user.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextUserId
  } catch (error) {
    console.error('Error generating unique user ID:', error)
    throw error
  }
}

// Generate product id
export async function generateUniqueProductId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.product.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextUserId
  } catch (error) {
    console.error('Error generating unique product ID:', error)
    throw error
  }
}

// Generate supplier id
export async function generateUniqueSupplierId(code: string): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastIdNumber = await prisma.suppliers.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastIdNumber) {
      const lastId = lastIdNumber.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique supplier ID:', error)
    throw error
  }
}
// Generate warranty id
export async function generateUniqueWarrantyId(code: string): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastIdNumber = await prisma.warranty.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastIdNumber) {
      const lastId = lastIdNumber.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique supplier ID:', error)
    throw error
  }
}

// Generate generateUniqueSupplierPaymentId id
export async function generateUniqueSupplierPaymentId(
  code: string,
): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.supplierPayment.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextUserId
  } catch (error) {
    console.error('Error generating unique supplier payment ID:', error)
    throw error
  }
}

// Generate supplierPayment id
export async function generateUniqueCustomerId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.customers.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextCustomerId = `${codeUpperCase}-${String(count + 1).padStart(
      5,
      '0',
    )}`

    return nextCustomerId
  } catch (error) {
    console.error('Error generating unique customer ID:', error)
    throw error
  }
}

// Generate sell id
// export async function generateUniqueSellId(code: string): Promise<string> {
//   try {
//     // Get the count of existing users
//     const count = await prisma.sells.count()
//     const codeUpperCase = code.toUpperCase()

//     // Generate the next unique user ID
//     const nextSellId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

//     return nextSellId
//   } catch (error) {
//     console.error('Error generating unique sell ID:', error)
//     throw error
//   }
// }

// Generate customer payment id
export async function generateUniqueCustomerPaymentId(
  code: string,
): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.returns.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextCustomerPaymentId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextCustomerPaymentId
  } catch (error) {
    console.error('Error generating unique customer payment ID:', error)
    throw error
  }
}

// Generate color id
export async function generateUniqueColorId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.colors.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextColorId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextColorId
  } catch (error) {
    console.error('Error generating unique color ID:', error)
    throw error
  }
}
// Generate currency type id
export async function generateUniqueCurrencyTypeId(
  code: string,
): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.currencyType.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextCurrencyTypeId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextCurrencyTypeId
  } catch (error) {
    console.error('Error generating unique currency type ID:', error)
    throw error
  }
}

// Generate discount id
export async function generateUniqueDiscountId(code: string): Promise<string> {
  try {
    // Get the count of existing discount
    const count = await prisma.discounts.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextDiscountId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextDiscountId
  } catch (error) {
    console.error('Error generating unique discount ID:', error)
    throw error
  }
}
// Generate vat id
export async function generateUniqueVatId(code: string): Promise<string> {
  try {
    // Get the count of existing vat
    const count = await prisma.vats.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextVatId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextVatId
  } catch (error) {
    console.error('Error generating unique vat ID:', error)
    throw error
  }
}

export async function generateUniqueBrandId(code: string): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastBrand = await prisma.brands.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastBrand) {
      const lastId = lastBrand.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique brand ID:', error)
    throw error
  }
}

// Supplier sells id generate
// export async function generateUniqueSupplierSellId(
//   code: string,
// ): Promise<string> {
//   try {
//     const codeUpperCase = code.toUpperCase()

//     // Get the last inserted uniqueId that matches the given code
//     const lastSells = await prisma.supplierSell.findFirst({
//       where: {
//         uniqueId: {
//           startsWith: codeUpperCase,
//         },
//       },
//       orderBy: {
//         uniqueId: 'desc',
//       },
//     })

//     let nextNumber = 1
//     if (lastSells) {
//       const lastId = lastSells.uniqueId
//       const lastNumber = parseInt(lastId.split('-')[1], 10)
//       nextNumber = lastNumber + 1
//     }

//     // Generate the next unique supplier sell ID
//     const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

//     return nextBrandId
//   } catch (error) {
//     console.error('Error generating unique supplier sells ID:', error)
//     throw error
//   }
// }

// Purchase report or invoice id generator
export async function generateUniqueInvoiceId(code: string): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastBrand = await prisma.purchaseGroup.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastBrand) {
      const lastId = lastBrand.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique brand ID:', error)
    throw error
  }
}
// Purchase report or invoice id generator
export async function generateUniquePurchaseId(code: string): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastBrand = await prisma.purchase.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastBrand) {
      const lastId = lastBrand.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique purchase ID:', error)
    throw error
  }
}
// Sell unique id generator
export async function generateUniqueSellId(code: string): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastBrand = await prisma.sells.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastBrand) {
      const lastId = lastBrand.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique sell ID:', error)
    throw error
  }
}

// Sells report or invoice id generator or Sells unique id generator
export async function generateUniqueInvoiceGroupId(
  code: string,
): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastDes = await prisma.sellGroups.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastDes) {
      const lastId = lastDes.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique sells group ID:', error)
    throw error
  }
}
// Generate unique id for return
export async function generateUniqueReturnId(code: string): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastDes = await prisma.returns.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastDes) {
      const lastId = lastDes.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique return ID:', error)
    throw error
  }
}
// Generate unique id for return group
export async function generateUniqueReturnGroupId(
  code: string,
): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastDes = await prisma.returnGroups.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastDes) {
      const lastId = lastDes.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique return ID:', error)
    throw error
  }
}
// Generate unique id for additional expense
export async function generateUniqueAdditionalExpenseId(
  code: string,
): Promise<string> {
  try {
    const codeUpperCase = code.toUpperCase()

    // Get the last inserted uniqueId that matches the given code
    const lastDes = await prisma.additionalExpenses.findFirst({
      where: {
        uniqueId: {
          startsWith: codeUpperCase,
        },
      },
      orderBy: {
        uniqueId: 'desc',
      },
    })

    let nextNumber = 1
    if (lastDes) {
      const lastId = lastDes.uniqueId
      const lastNumber = parseInt(lastId.split('-')[1], 10)
      nextNumber = lastNumber + 1
    }

    // Generate the next unique brand ID
    const nextBrandId = `${codeUpperCase}-${String(nextNumber).padStart(5, '0')}`

    return nextBrandId
  } catch (error) {
    console.error('Error generating unique ID:', error)
    throw error
  }
}
