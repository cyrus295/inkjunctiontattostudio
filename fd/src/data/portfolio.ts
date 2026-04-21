import tatto1 from "./image/img/1/tatto1.jpeg";
import tatto2 from "./image/img/1/tatto2.jpeg";
import tatto3 from "./image/img/1/tatto3.jpeg";
import tatto4 from "./image/img/1/tatto4.jpeg";
import tatto5 from "./image/img/1/tatto5.jpeg";
import tatto6 from "./image/img/1/tatto6.jpeg";
import tatto7 from "./image/img/1/tatto7.jpeg";
import tatto8 from "./image/img/1/tatto8.jpeg";
import tatto9 from "./image/img/1/tatto9.jpeg";

export type PortfolioItem = {
  id: number | string;
  type: "image" | "video";
  src: string;
  style: string;
  caption: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    type: "image",
    src: tatto1,
    style: "Traditional",
    caption: "Back piece — Client: Alex, 2024"
  },
  {
    id: 2,
    type: "image",
    src: tatto2,
    style: "Realism",
    caption: "Portrait — Client: Jordan, 2023"
  },
  {
    id: 3,
    type: "image",
    src: tatto3,
    style: "Blackwork",
    caption: "Sleeve — Client: Marcus, 2024"
  },
  {
    id: 4,
    type: "image",
    src: tatto4,
    style: "Watercolor",
    caption: "Forearm — Client: Sarah, 2023"
  },
  {
    id: 5,
    type: "image",
    src: tatto5,
    style: "Traditional",
    caption: "Chest piece — Client: Mike, 2024"
  },
  {
    id: 6,
    type: "image",
    src: tatto6,
    style: "Geometric",
    caption: "Arm band — Client: Emma, 2023"
  },
  {
    id: 7,
    type: "image",
    src: tatto7,
    style: "Realism",
    caption: "Thigh piece — Client: David, 2024"
  },
  {
    id: 8,
    type: "image",
    src: tatto8,
    style: "Japanese",
    caption: "Back piece — Client: Lisa, 2023"
  },
  {
    id: 9,
    type: "image",
    src: tatto9,
    style: "Dotwork",
    caption: "Hand — Client: Tom, 2024"
  }
];
