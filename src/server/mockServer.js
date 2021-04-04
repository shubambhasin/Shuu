import { createServer, Model } from "miragejs";
import { database } from "../database/database";

export const mockServer = () => {
  createServer({
    models: {
      product: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 2000;
      this.resource("products");
    },

    seeds(server) {
      database.forEach((product) => {
        server.create("product", {
          ...product,
        });
      });
    },
  });
};
