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

// Generate purchase id
export async function generateUniquePurchaseId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.purchase.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextUserId
  } catch (error) {
    console.error('Error generating unique purchase ID:', error)
    throw error
  }
}

// Generate supplier id
export async function generateUniqueSupplierId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.suppliers.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextUserId
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
export async function generateUniqueSellId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const count = await prisma.sells.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextSellId = `${codeUpperCase}-${String(count + 1).padStart(5, '0')}`

    return nextSellId
  } catch (error) {
    console.error('Error generating unique sell ID:', error)
    throw error
  }
}
