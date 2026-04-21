export interface PortfolioItem {
  _id: string;
  type: "image" | "video";
  src: string;
  style: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
}