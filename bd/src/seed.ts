import dotenv from "dotenv";
import Portfolio from "./models/Portfolio";
import { connectDB } from "./config/db";

dotenv.config();

const imagesInDir = [
  "1/20250325_173111.jpg.jpeg",
  "1/20250412_162526.jpg.jpeg",
  "1/20250502_145742.jpg.jpeg",
  "1/20250509_194926.jpg.jpeg",
  "1/20250513_171848.jpg.jpeg",
  "1/20250525_181142(0).jpg.jpeg",
  "1/20250602_215013.jpg.jpeg",
  "1/20250701_002423.jpg.jpeg",
  "1/20250713_022937.jpg.jpeg",
  "1/20250716_164614.jpg.jpeg",
  "1/20250725_171154.jpg.jpeg",
  "1/20250729_165942.jpg.jpeg",
  "1/20250729_170153.jpg.jpeg",
  "1/20250806_180813.jpg.jpeg",
  "1/20250809_205936.jpg.jpeg",
  "1/20250907_191944.jpg.jpeg",
  "1/20251006_160505.jpg.jpeg",
  "1/20251006_160525.jpg.jpeg",
  "1/20251017_163207.jpg.jpeg",
  "1/20251019_192343(0).jpg.jpeg",
  "1/20251019_192417.jpg.jpeg",
  "1/20251023_190414.jpg.jpeg",
  "1/20251023_190442.jpg.jpeg",
  "1/20251105_140210.jpg.jpeg",
  "1/20251105_185519.jpg.jpeg",
  "1/20251107_223534.jpg.jpeg",
  "1/20251116_143105.jpg.jpeg",
  "1/20251116_163522.jpg.jpeg",
  "1/20251230_162122.jpg.jpeg",
  "1/20260109_190102.jpg.jpeg",
  "1/20260110_173650.jpg.jpeg",
  "1/IMG-20250814-WA0003.jpg.jpeg",
  "1/IMG-20250901-WA0011.jpg.jpeg",
  "1/mini/tatto1.jpeg",
  "1/mini/tatto2.jpeg",
  "1/mini/tatto3.jpeg",
  "1/mini/tatto4.jpeg",
  "1/mini/tatto5.jpeg",
  "1/mini/tatto6.jpeg",
  "1/mini/tatto7.jpeg",
  "1/mini/tatto8.jpeg",
  "1/mini/tatto9.jpeg"
];

const videoItems = [
  {
    type: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-186-large.mp4",
    style: "Artistic",
    caption: "Ink Motion Study"
  }
];

const styles = ["Traditional", "Realism", "Blackwork", "Watercolor", "Geometric", "Japanese", "Dotwork", "New School"];

const seedData = [
  ...imagesInDir.map((img, index) => ({
    type: "image" as const,
    src: `/img/${img}`,
    style: styles[index % styles.length],
    caption: `Tattoo design ${index + 1}`
  })),
  ...videoItems
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Portfolio.deleteMany({});
    console.log(" Cleared existing portfolio data");
    
    // Insert seed data
    const insertedItems = await Portfolio.insertMany(seedData);
    console.log(`✅ Seeded ${insertedItems.length} portfolio items`);
    
    process.exit(0);
  } catch (error) {
    console.error(" Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
