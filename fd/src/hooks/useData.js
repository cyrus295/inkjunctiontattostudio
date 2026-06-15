import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { portfolioItems as mockPortfolioItems } from "../data/portfolio.js";

// API URL for REST calls
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Socket URL — strip /api from the end
const SOCKET_URL = API_URL.replace(/\/api$/, "");

export const useData = () => {
  const [portfolio, setPortfolio] = useState(mockPortfolioItems);
  const [content, setContent] = useState({});
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    let socket;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [portfolioRes, contentRes, offersRes] = await Promise.all([
          axios.get(`${API_URL}/portfolio`),
          axios.get(`${API_URL}/content`),
          axios.get(`${API_URL}/offers`),
        ]);

        if (Array.isArray(portfolioRes.data) && portfolioRes.data.length > 0) {
          setPortfolio(portfolioRes.data);
        }
        setContent(contentRes.data || {});
        setOffers(offersRes.data || []);
        setBackendConnected(true);
      } catch (error) {
        console.warn("Backend connection failed, using mock data:", error.message);
        setBackendConnected(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Socket.IO — polling first (required for Render), then upgrade to websocket
    try {
      socket = io(SOCKET_URL, {
        transports: ["polling", "websocket"],
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        timeout: 20000,
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
        setBackendConnected(true);
      });

      socket.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
      });

      socket.on("connect_error", (error) => {
        console.warn("Socket connection error:", error.message);
      });

      socket.on("portfolioUpdated", (data) => {
        if (data.action === "add") {
          setPortfolio((prev) => [data.item, ...prev]);
        } else if (data.action === "update") {
          setPortfolio((prev) =>
            prev.map((item) => (item._id === data.item._id ? data.item : item))
          );
        } else if (data.action === "delete") {
          setPortfolio((prev) => prev.filter((item) => item._id !== data.id));
        }
      });

      socket.on("contentUpdated", (data) => {
        setContent((prev) => ({ ...prev, [data.key]: data.value }));
      });

      socket.on("offersUpdated", (data) => {
        if (data.action === "add") {
          setOffers((prev) => [data.item, ...prev]);
        } else if (data.action === "update") {
          setOffers((prev) =>
            prev.map((item) => (item._id === data.item._id ? data.item : item))
          );
        } else if (data.action === "delete") {
          setOffers((prev) => prev.filter((item) => item._id !== data.id));
        }
      });
    } catch (err) {
      console.error("Socket initialization failed:", err);
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const refreshData = async () => {
    try {
      const [portfolioRes, contentRes, offersRes] = await Promise.all([
        axios.get(`${API_URL}/portfolio`),
        axios.get(`${API_URL}/content`),
        axios.get(`${API_URL}/offers`),
      ]);
      setPortfolio(portfolioRes.data);
      setContent(contentRes.data);
      setOffers(offersRes.data);
      setBackendConnected(true);
    } catch (error) {
      setBackendConnected(false);
    }
  };

  return { portfolio, content, offers, loading, backendConnected, refreshData };
};
