import { generateUniquePurchaseId } from '../uniqueIdGenerator'

const generateUniqueId = (prefix: string, count: number, length: number) => {
  return `${prefix}-${String(count).padStart(length - prefix.length, '0')}`
}

export const generateUniquePurchaseIds = async (
  prefix: string,
  numIds: number,
) => {
  const currentNumber = await generateUniquePurchaseId('PUR')
  const numberPart = currentNumber.split('-')[1]
  // @ts-ignore
  let lastPurchaseCount = parseInt(numberPart - 1)

  const uniqueIds: string[] = []

  for (let i = 1; i <= numIds; i++) {
    lastPurchaseCount++

    const uniqueId = generateUniqueId(prefix, lastPurchaseCount, 8)
    uniqueIds.push(uniqueId)
  }
  return uniqueIds
}
