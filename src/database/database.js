import faker from "faker";
import uuid from "react-uuid";

faker.seed(0);

export const database = [...Array(30)].map((id) => ({
  id: uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  category: faker.random.arrayElement([
    "Formals",
    "Sneakers",
    "Hiking",
  ]),
  brand: faker.random.arrayElement(["Nuke", "Suma", "Teebok", "Abibas"]),
  isPopular: faker.random.boolean(),
  isNewest: faker.random.boolean(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  yogaAssured: faker.random.boolean(),
  ratings: faker.random.arrayElement([1.41, 2.52, 3.61, 4.89, 5.0]),
  offer: faker.random.arrayElement(["10", "20", "50", "70"]),
  totalPurchase: faker.random.number(),
  availableQty: faker.random.arrayElement([5, 25, 3, 17, 44, 100]),
}));
