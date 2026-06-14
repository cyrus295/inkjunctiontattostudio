import express from "express";
import { prisma } from "../config/db.js";

const router = express.Router();

const normalizeItem = (item) => ({ ...item, _id: item.id });

// GET all portfolio items
router.get("/", async (req, res) => {
  try {
    const { style, limit } = req.query;
    const where = {};

    if (style && typeof style === "string") {
      where.style = { contains: style, mode: "insensitive" };
    }

    const items = await prisma.portfolio.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit, 10) : undefined,
    });

    res.json(items.map(normalizeItem));
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ error: "Failed to fetch portfolio items" });
  }
});

// GET single portfolio item
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }

    res.json(normalizeItem(item));
  } catch (error) {
    console.error("Error fetching portfolio item:", error);
    res.status(500).json({ error: "Failed to fetch portfolio item" });
  }
});

// POST new portfolio item (admin only - add authentication in production)
router.post("/", async (req, res) => {
  try {
    const { type, src, beforeSrc, style, caption } = req.body;

    if (!type || !src || !style || !caption) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const savedItem = await prisma.portfolio.create({
      data: {
        type,
        src,
        beforeSrc: beforeSrc || null,
        style,
        caption,
      },
    });

    if (req.io) {
      req.io.emit("portfolioUpdated", { action: "add", item: normalizeItem(savedItem) });
    }

    res.status(201).json(normalizeItem(savedItem));
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    res.status(500).json({ error: "Failed to create portfolio item" });
  }
});

// PUT update portfolio item
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { type, src, beforeSrc, style, caption } = req.body;

    const updatedItem = await prisma.portfolio.update({
      where: { id },
      data: {
        type,
        src,
        beforeSrc: beforeSrc || null,
        style,
        caption,
      },
    });

    if (req.io) {
      req.io.emit("portfolioUpdated", { action: "update", item: normalizeItem(updatedItem) });
    }

    res.json(normalizeItem(updatedItem));
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    res.status(500).json({ error: "Failed to update portfolio item" });
  }
});

// DELETE portfolio item
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedItem = await prisma.portfolio.delete({ where: { id } });

    if (req.io) {
      req.io.emit("portfolioUpdated", { action: "delete", id: deletedItem.id });
    }

    res.json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
});

export default router;
