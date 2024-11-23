import { linkRepository } from "./links.repository.js";

export const linkService = {
  create: (url) => {
    return linkRepository.create({ originalUrl: url });
  },

  get: (id) => {
    const link = linkRepository.get(id);
    if (!link) {
      throw new Error("Link not found");
    }
    linkRepository.incrementVisits(link);
    return link;
  },

  list: () => {
    return linkRepository.list();
  }
};
