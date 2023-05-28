import { log } from "console";
import prisma from "../db";

/**
 * Get one
 */
export const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.status(200);
  res.json({ data: product });
};

/**
 * Get all
 */
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.status(200);
  res.json({ data: user.products });
};

/**
 * Create one
 */
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.status(201);
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
};

/**
 * Update one
 */
export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200);
    res.json({ data: updated });
  } catch (err) {
    err.type = "auth";
    next(err);
  }
};

/**
 * Delete one
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id,
          belongsToId: req.user.id,
        },
      },
    });

    res.status(200);
    res.json({ data: deleted });
  } catch (err) {
    err.type = "auth";
    next(err);
  }
};
