const express = require("express");
const bodyParser = require("body-parser");
const responseTime = require("response-time");
const cookieParser = require("cookie-parser");

const app = express();

const APIrouter = require("./routes/api_router");

const { PORT, DB_FORCE, DB_ALTER } = require("./config/serverConfig");

const db = require("./config/db_config");
const { User, Order, OrderProduct, Product } = require("./models");

app.use(responseTime());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", APIrouter);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  if (DB_FORCE == true) {
    await db.sync({ force: true });
  } else if (DB_ALTER == true) {
    await db.sync({ alter: true });
  } else {
    await db.sync();
  }
  console.log("Database connected");

  // const arr = await OrderProduct.findAll({
  //   where: {
  //     orderId: 3,
  //   },
  // });

  // arr.forEach((element) => {
  //   console.log(element.productId, element.quantity);
  // });

  // const orderProducts = arr.map((orderProduct) => {
  //   return {
  //     productId: orderProduct.productId,
  //     quantity: orderProduct.quantity,
  //   };
  // });

  // // console.log(orderProducts);

  // const response = await Order.findOne({
  //   where: {
  //     id: 2,
  //   },
  //   include: {
  //     model: Product,
  //     attributes: ["title", "id", "price", "image"],
  //     through: {
  //       model: OrderProduct,
  //       attributes: ["quantity"],
  //     },
  //   },
  //   attributes: ["id", "status", "createdAt", "updatedAt"],
  // });

  // console.log(
  //   response.dataValues.id,
  //   response.dataValues.status,
  //   response.dataValues.createdAt,
  //   response.dataValues.updatedAt
  // );

  // console.log(
  //   response.dataValues.products[0].order_product.dataValues.quantity
  // );

  // const products = response.dataValues.products.map((product) => {
  //   return {
  //     id: product.dataValues.id,
  //     title: product.dataValues.title,
  //     price: product.dataValues.price,
  //     image: product.dataValues.image,
  //     quantity: product.order_product.dataValues.quantity,
  //   };
  // });

  // console.log(typeof response.dataValues.products[0].dataValues.price);
});
