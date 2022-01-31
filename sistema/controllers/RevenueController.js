import models from "../models";

async function increaseStock(idArticle, quantity) {
  let { stock } = await models.Article.findOne({ _id: idArticle });
  let newStock = parseInt(stock) + parseInt(quantity);
  const reg = await models.Article.findOneAndUpdate(
    { _id: idArticle },
    { stock: newStock }
  );
}

async function decreaseStock(idArticle, quantity) {
  let { stock } = await models.Article.findOne({ _id: idArticle });
  let newStock = parseInt(stock) - parseInt(quantity);
  const reg = await models.Article.findOneAndUpdate(
    { _id: idArticle },
    { stock: newStock }
  );
}

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Revenue.create(req.body);
      //Update Stock
      let details = req.body.details;
      details.map(function (i) {
        increaseStock(i._id, i.quantity);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Revenue.findOne({ _id: req.query._id })
        .populate("user", { name: 1 })
        .populate("person", { name: 1 });
      if (!reg) {
        res.status(404).send({
          message: "Register not found!",
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },

  list: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Revenue.find({
        $or: [
          { receipt_num: new RegExp(valor, "i") },
          { receipt_serie: new RegExp(valor, "i") },
        ],
      })
        .populate("user", { name: 1 })
        .populate("person", { name: 1 })
        .sort({ createdAt: -1 });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

  //WOULD CAUSE STOCK ISSUES
  //   update: async (req, res, next) => {
  //     try {
  //       const reg = await models.Category.findByIdAndUpdate(
  //         { _id: req.body._id },
  //         { name: req.body.name, description: req.body.description }
  //       );
  //       res.status(200).json(reg);
  //     } catch (e) {
  //       res.status(500).send({
  //         message: "Whoops something went wrong",
  //       });
  //       next(e);
  //     }
  //   },
  //   remove: async (req, res, next) => {
  //     const reg = await models.Category.findByIdAndDelete({ _id: req.body._id });
  //     res.status(200).json(reg);
  //     try {
  //     } catch (e) {
  //       res.status(500).send({
  //         message: "Whoops something went wrong",
  //       });
  //       next(e);
  //     }
  //   },

  activate: async (req, res, next) => {
    try {
      const reg = await models.Revenue.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
      );
      let details = reg.details;
      details.map(function (i) {
        increaseStock(i._id, i.quantity);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },
  deactivate: async (req, res, next) => {
    try {
      const reg = await models.Revenue.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
      );
      let details = reg.details;
      details.map(function (i) {
        decreaseStock(i._id, i.quantity);
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },

  stats12Months: async (req, res, next) => {
    try {
      const reg = await models.Revenue.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            total: { $sum: "$total" },
            num: { $sum: 1 },
          },
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1,
          },
        },
      ]).limit(12);
      res.status(200).json(reg)
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },
//This may be incorrect, when formatting removes quotes from find() function.
  checkDates: async (req, res, next) => {
    try {
      let start = req.query.start;
      let end = req.query.end;
      const reg = await models.Revenue.find({
        'createdAt': {"$gte": start, "$lt": end}
      })
        .populate("user", { name: 1 })
        .populate("person", { name: 1 })
        .sort({ createdAt: -1 });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },


};
