import dotenv from "dotenv";
import { connectDB, prisma } from "./config/db.js";

dotenv.config();

// Local images served via /img/ route (work in development)
const localImages = [
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
  "1/mini/tatto9.jpeg",
];

const styles = [
  "Traditional", "Realism", "Blackwork", "Watercolor",
  "Geometric", "Japanese", "Dotwork", "New School"
];

// Portrait items — shown in Portrait Tattoos section
const portraitItems = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
    style: "Portrait",
    caption: "Realistic Face Portrait",
    beforeSrc: null,
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1590246815117-6ca7632c2b11?w=800&q=80",
    style: "Portrait",
    caption: "Detailed Eye Portrait",
    beforeSrc: null,
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80",
    style: "Portrait",
    caption: "Custom Portrait Design",
    beforeSrc: null,
  },
];

// Coverup items — shown in Coverup Magic section (need beforeSrc)
const coverupItems = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1564415315949-7a0c4b9b06d0?w=800&q=80",
    style: "Coverup",
    caption: "Rose Coverup Transformation",
    beforeSrc: "https://images.unsplash.com/photo-1527090526205-beaac8dc3c62?w=800&q=80",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&q=80",
    style: "Coverup",
    caption: "Dragon Sleeve Coverup",
    beforeSrc: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?w=800&q=80",
  },
];

// Video item
const videoItems = [
  {
    type: "video",
    src: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-186-large.mp4",
    style: "Artistic",
    caption: "Ink Motion Study",
    beforeSrc: null,
  },
];

const seedData = [
  // Main portfolio from local images
  ...localImages.map((img, index) => ({
    type: "image",
    src: `/img/${img}`,
    style: styles[index % styles.length],
    caption: `Custom ${styles[index % styles.length]} Design`,
    beforeSrc: null,
  })),
  // Portrait section items
  ...portraitItems,
  // Coverup section items
  ...coverupItems,
  // Video
  ...videoItems,
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await prisma.portfolio.deleteMany();
    console.log(" Cleared existing portfolio data");

    const insertedItems = await prisma.portfolio.createMany({
      data: seedData,
    });

    console.log(` Seeded ${insertedItems.count} portfolio items`);
    console.log(`   - ${localImages.length} main portfolio images`);
    console.log(`   - ${portraitItems.length} portrait items`);
    console.log(`   - ${coverupItems.length} coverup items`);
    console.log(`   - ${videoItems.length} video items`);

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error(" Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
