import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction([
    prisma.player.deleteMany(),
    prisma.inventory.deleteMany(),
    prisma.update.deleteMany(),
    prisma.updatePoint.deleteMany(),
  ]);
};
