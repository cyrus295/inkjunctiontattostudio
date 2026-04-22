import express from "express";
import Portfolio from "../models/Portfolio.js";

const router = express.Router();

// GET all portfolio items
router.get("/", async (req, res) => {
  try {
    const { style, limit } = req.query;
    
    let query = {};
    if (style && typeof style === "string") {
      query = { style: new RegExp(style, "i") };
    }

    let portfolioQuery = Portfolio.find(query).sort({ createdAt: -1 });
    
    if (limit && typeof limit === "string") {
      portfolioQuery = portfolioQuery.limit(parseInt(limit));
    }

    const items = await portfolioQuery.exec();
    res.json(items);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ error: "Failed to fetch portfolio items" });
  }
});

// GET single portfolio item
router.get("/:id", async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    
    res.json(item);
  } catch (error) {
    console.error("Error fetching portfolio item:", error);
    res.status(500).json({ error: "Failed to fetch portfolio item" });
  }
});

// POST new portfolio item (admin only - add authentication in production)
router.post("/", async (req, res) => {
  try {
    const { type, src, style, caption } = req.body;

    if (!type || !src || !style || !caption) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new Portfolio({
      type,
      src,
      style,
      caption,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    res.status(500).json({ error: "Failed to create portfolio item" });
  }
});

// PUT update portfolio item
router.put("/:id", async (req, res) => {
  try {
    const { type, src, style, caption } = req.body;

    const updatedItem = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { type, src, style, caption },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    res.status(500).json({ error: "Failed to update portfolio item" });
  }
});

// DELETE portfolio item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Portfolio.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Portfolio item not found" });
    }
    
    res.json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    res.status(500).json({ error: "Failed to delete portfolio item" });
  }
});

export default router;
