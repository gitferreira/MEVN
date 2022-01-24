import models from "../models";
export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Category.create(req.body);
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
      const reg = await models.Category.findOne({ _id: req.query._id });
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
            let valor = req.query.valor
            const reg = await models.Category.find({$or:[{'name': new RegExp(valor, 'i')}, {'description': new RegExp(valor, 'i')}]}, {createdAt: 0})
            .sort({'createdAt':-1});


         
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { name: req.body.name, description: req.body.description }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },
  remove: async (req, res, next) => {
    const reg = await models.Category.findByIdAndDelete({ _id: req.body._id });
    res.status(200).json(reg);
    try {
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
      );
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
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Whoops something went wrong",
      });
      next(e);
    }
  },
};
