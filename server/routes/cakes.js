const express = require("express");
const { keyBy } = require("lodash");
const CakeModel = require("../db/models/cake");
const nodemailer = require("nodemailer");

const router = express.Router();

router.get("/", (req, res) => {
  CakeModel.find((err, cakes) => {
    if (err) return res.status(500).send(err);
    const cakeOrdersData = keyBy(cakes, "_id");
    return res.json(cakeOrdersData);
  });
});

router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const cake = new CakeModel(body);
    const savedOrder = await cake.save();
    res.json(savedOrder);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.put("/:id", (req, res) => {
  const { body, params } = req;
  CakeModel.findByIdAndUpdate(
    params.id,
    body,
    { new: true },
    (err, updatedCakeOrder) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      return res.json(updatedCakeOrder);
    }
  );
});

router.delete("/:id", (req, res) => {
  const { params } = req;
  CakeModel.findByIdAndRemove(params.id, (err, deletedOrder) => {
    // Handle any possible database errors
    if (err) return res.status(500).send(err);
    const response = {
      message: "Order successfully deleted",
      id: deletedOrder._id
    };
    return res.status(200).send(response);
  });
});

module.exports = router;
