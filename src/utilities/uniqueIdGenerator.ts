import prisma from "../shared/prisma";

export async function generateUniqueId(code: string): Promise<string> {
  try {
    // Get the count of existing users
    const userCount = await prisma.user.count();
    const codeUpperCase = code.toUpperCase();

    // Generate the next unique user ID
    const nextUserId = `${codeUpperCase}-${String(userCount + 1).padStart(
      5,
      "0"
    )}`;

    return nextUserId;
  } catch (error) {
    console.error("Error generating unique user ID:", error);
    throw error;
  }
}
