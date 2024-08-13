const randomSeed = Math.floor(Math.random() * 1000)

export const placeholderUser = async (): Promise<string> => {
  const image = await `https://picsum.photos/seed/${randomSeed}/120/120`
  return image
}
export const placeholderProduct = async (): Promise<string> => {
  const image = await `https://picsum.photos/seed/${randomSeed}/400/600`
  return image
}
