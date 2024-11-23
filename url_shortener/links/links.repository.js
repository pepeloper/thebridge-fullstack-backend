import { links } from "./links.database.js";
import { nanoid } from "nanoid";

export const linkRepository = {
  create: (data) => {
    const id = nanoid(8);
    const link = {
      id,
      originalUrl: data.originalUrl,
      shortUrl: `http://localhost:3000/${id}`,
      visits: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    links.push(link);
    return link;
  },

  get: (id) => {
    return links.find((link) => link.id === id);
  },

  list: () => {
    return [...links].sort((a, b) => b.createdAt - a.createdAt);
  },

  incrementVisits: (link) => {
    const index = links.findIndex(l => l.id === link.id);
    if (index !== -1) {
      links[index] = {
        ...links[index],
        visits: links[index].visits + 1,
        updatedAt: new Date()
      };
    }
  }
};
