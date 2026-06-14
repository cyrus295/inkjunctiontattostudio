import express from "express";
import { prisma } from "../config/db.js";

const router = express.Router();

// GET all content
router.get("/", async (req, res) => {
  try {
    const content = await prisma.content.findMany();
    const contentMap = content.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    res.json(contentMap);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});

// GET content by key
router.get("/:key", async (req, res) => {
  try {
    const item = await prisma.content.findUnique({
      where: { key: req.params.key },
    });
    if (!item) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching content item:", error);
    res.status(500).json({ error: "Failed to fetch content item" });
  }
});

// UPDATE or CREATE content
router.post("/", async (req, res) => {
  try {
    const { key, value, category, description } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({ error: "Key and value are required" });
    }

    const updatedItem = await prisma.content.upsert({
      where: { key },
      update: { value, category, description },
      create: { key, value, category, description },
    });

    if (req.io) {
      req.io.emit("contentUpdated", { key, value });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ error: "Failed to update content" });
  }
});

export default router;
