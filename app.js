const express = require("express");
let products = require("./products");

const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
const slugify = require("slugify");

app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product !== foundProduct);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
