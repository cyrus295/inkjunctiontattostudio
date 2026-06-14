import express from "express";
import { prisma } from "../config/db.js";

const router = express.Router();

const normalizeOffer = (offer) => ({ ...offer, _id: offer.id });

// GET all offers
router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const offers = await prisma.offer.findMany({
      where: {
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } }
        ]
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(offers.map(normalizeOffer));
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Failed to fetch offers" });
  }
});

// POST new offer
router.post("/", async (req, res) => {
  try {
    const { title, description, type, src, expiresAt } = req.body;

    if (!title || !description || !type || !src) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const savedOffer = await prisma.offer.create({
      data: {
        title,
        description,
        type,
        src,
        isActive: true,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    if (req.io) {
      req.io.emit("offersUpdated", { action: "add", item: normalizeOffer(savedOffer) });
    }

    res.status(201).json(normalizeOffer(savedOffer));
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ error: "Failed to create offer" });
  }
});

// PUT update offer
router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, description, type, src, isActive, expiresAt } = req.body;

    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: {
        title,
        description,
        type,
        src,
        isActive,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    if (req.io) {
      req.io.emit("offersUpdated", { action: "update", item: normalizeOffer(updatedOffer) });
    }

    res.json(normalizeOffer(updatedOffer));
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({ error: "Failed to update offer" });
  }
});

// DELETE offer
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedOffer = await prisma.offer.delete({ where: { id } });

    if (req.io) {
      req.io.emit("offersUpdated", { action: "delete", id: deletedOffer.id });
    }

    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({ error: "Failed to delete offer" });
  }
});

export default router;
