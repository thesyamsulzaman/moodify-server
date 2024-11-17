import prisma from "../db";

// Get all
export const getInventories = async (req: any, res: any, next: any) => {
  try {
    const inventories = await prisma.player.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        inventories: true,
      },
    });

    res.json({ data: inventories });
  } catch (err) {
    next(err);
  }
};

// Get one
export const getInventoryById = async (req: any, res: any, next: any) => {
  try {
    const product = await prisma.inventory.findUnique({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const createInventory = async (req: any, res: any, next: any) => {
  try {
    const product = await prisma.inventory.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

export const updateInventory = async (req: any, res: any, next: any) => {
  try {
    const updated = await prisma.inventory.update({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
      data: {
        name: req.body.name,
      },
    });
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteInventory = async (req: any, res: any, next: any) => {
  try {
    const deleted = await prisma.inventory.delete({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: deleted });
  } catch (err) {
    next(err);
  }
};
