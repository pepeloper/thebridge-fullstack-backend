import { linkService } from "./links.service.js";

export const linkController = {
  create: (req, res) => {
    try {
      const { url } = req.body;
      const link = linkService.create(url);

      res.status(201).json(link);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  redirectToUrl: (req, res) => {
    try {
      const { id } = req.params;
      const link = linkService.get(id);
      res.redirect(link.originalUrl);
    } catch (error) {
      res.status(404).json({
        error: error.message,
      });
    }
  },

  list: (req, res) => {
    try {
      const links = linkService.list();
      res.json(links);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
};
