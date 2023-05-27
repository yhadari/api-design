import prisma from "../db";

/**
 * Get one
 */
export const getOneUpdate = async (req, res) => {
  const id = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });

  res.status(200);
  res.json({ data: update });
};

/**
 * Get all
 */
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  res.status(200);
  res.json({ data: updates });
};

/**
 * Create one
 */
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    res.status(404);
    res.json({ message: "Product not found" });
    return;
  }

  if (product.belongsToId !== req.user.id) {
    res.status(403);
    res.json({ message: "Unauthorized" });
    return;
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.status(201);
  res.json({ data: update });
};

/**
 * Update one
 */
export const updateUpdate = async (req, res) => {
  const id = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: update.productId,
    },
  });

  if (product.belongsToId !== req.user.id) {
    res.status(403);
    res.json({ message: "Unauthorized" });
    return;
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id,
    },
    data: req.body,
  });

  res.status(200);
  res.json({ data: updatedUpdate });
};

/**
 * Delete one
 */
export const deleteUpdate = async (req, res) => {
  const id = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: update.productId,
    },
  });

  if (product.belongsToId !== req.user.id) {
    res.status(403);
    res.json({ message: "Unauthorized" });
    return;
  }

  const deleteUpdate = await prisma.update.delete({
    where: {
      id,
    },
  });

  res.status(200);
  res.json({ data: deleteUpdate });
};
