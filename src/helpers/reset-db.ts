import prisma from "../db";

export default async () => {
  await prisma.$transaction([
    prisma.player.deleteMany(),
    prisma.inventory.deleteMany(),
    prisma.update.deleteMany(),
    prisma.updatePoint.deleteMany(),
  ]);
};
