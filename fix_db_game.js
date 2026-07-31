const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Game" 
      ADD COLUMN IF NOT EXISTS "developerName" TEXT,
      ADD COLUMN IF NOT EXISTS "developerLink" TEXT,
      ADD COLUMN IF NOT EXISTS "steamUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "discordUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "itchUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "twitterUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "videoUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "downloadUrl" TEXT,
      ADD COLUMN IF NOT EXISTS "bannerUrl" TEXT;
    `);
    console.log("Successfully added missing columns to Game table!");
  } catch (error) {
    console.error("Error updating database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
