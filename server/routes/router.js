const express = require("express");
const { keyBy } = require("lodash");
const OrderModel = require("../db/models/order");
const EmailService = require("../services/email-service");

function router(storageService) {
  const router = express.Router();
  const { upload } = storageService;

  router.get("/", (req, res) => {});

  router.post("/upload", upload.single("images"), (req, res) => {
    res.json({ file: req.file });
  });

  router.delete("/:id", (req, res) => {});

  router.get("/orders", (req, res) => {
    OrderModel.find((err, orders) => {
      if (err) return res.status(500).send(err);
      const ordersData = keyBy(orders, "_id");
      return res.json(ordersData);
    });
  });

  router.post("/orders", async (req, res) => {
    const { body } = req;

    try {
      const order = new OrderModel(body);
      const savedOrder = await order.save();
      //EmailService.sendEmail(savedOrder);
      res.json(savedOrder);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });

  router.put("/orders/:id", (req, res) => {
    const { body, params } = req;
    OrderModel.findByIdAndUpdate(
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

  router.delete("/orders/:id", (req, res) => {
    const { params } = req;
    OrderModel.findByIdAndRemove(params.id, (err, deletedOrder) => {
      // Handle any possible database errors
      if (err) return res.status(500).send(err);
      const response = {
        message: "Order successfully deleted",
        id: deletedOrder._id
      };
      return res.status(200).send(response);
    });
  });

  return router;
}

module.exports = router;
