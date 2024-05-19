import prisma from '../shared/prisma'

// Generate user id
export async function generateUniqueId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const userCount = await prisma.user.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(userCount + 1).padStart(
      5,
      '0',
    )}`

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
    const userCount = await prisma.product.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(userCount + 1).padStart(
      5,
      '0',
    )}`

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
    const userCount = await prisma.purchase.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(userCount + 1).padStart(
      5,
      '0',
    )}`

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
    const userCount = await prisma.suppliers.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(userCount + 1).padStart(
      5,
      '0',
    )}`

    return nextUserId
  } catch (error) {
    console.error('Error generating unique supplier ID:', error)
    throw error
  }
}

// Generate supplierPayment id
export async function generateUniqueSupplierPaymentId(
  code: string,
): Promise<string> {
  try {
    // Get the count of existing users
    const userCount = await prisma.supplierPayment.count()
    const codeUpperCase = code.toUpperCase()

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(userCount + 1).padStart(
      5,
      '0',
    )}`

    return nextUserId
  } catch (error) {
    console.error('Error generating unique supplier payment ID:', error)
    throw error
  }
}
