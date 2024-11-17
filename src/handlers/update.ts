import prisma from "../db";

export const getUpdates = async (req, res, next) => {
  try {
    const inventories = await prisma.inventory.findMany({
      where: { belongsToId: req.user.id },
      include: { updates: true },
    });

    const updates = inventories.reduce((allUpdates: any[], inventory: any) => {
      return [...allUpdates, ...inventory.updates];
    }, []);

    res.json({ data: updates });
  } catch (err) {
    next(err);
  }
};

export const getUpdateById = async (req, res, next) => {
  try {
    const update = await prisma.update.findFirst({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: update });
  } catch (err) {
    next(err);
  }
};

export const createUpdate = async (req, res, next) => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: { id: req.body.productId },
    });

    // does not belong to user
    if (!inventory) return res.json({ message: "nope" });
    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.title,
        inventory: { connect: { id: inventory.id } },
        updatedAt: Date.now() as any,
      },
    });
    res.json({ data: update });
  } catch (err) {
    next(err);
  }
};

export const updateUpdate = async (req, res, next) => {
  try {
    const inventories = await prisma.inventory.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = inventories.reduce((allUpdates: any[], inventory: any) => {
      return [...allUpdates, ...inventory.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);
    if (!match) return res.json({ message: "nope" });
    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    res.json({ data: updatedUpdate });
  } catch (err) {
    next(err);
  }
};

export const deleteUpdate = async (req, res, next) => {
  try {
    const inventories = await prisma.inventory.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });
    const updates = inventories.reduce((allUpdates: any[], inventory: any) => {
      return [...allUpdates, ...inventory.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);
    if (!match) return res.json({ message: "nope" });
    const deleted = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: deleted });
  } catch (err) {
    next(err);
  }
};
