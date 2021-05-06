import { createServer, Model } from "miragejs";
import { database } from "../database/database";

export const mockServer = () => {
  createServer({
    models: {
      product: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 700;
      this.resource("products");
      this.resource("men");
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
