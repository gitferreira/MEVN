import models from "../models";
import bcrypt from "bcryptjs";
// import token from "../services/token";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Person.create(req.body);
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
      const reg = await models.Person.findOne({ _id: req.query._id });
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
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

  listCustomers: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
          person_type: "Customer",
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

  listSuppliers: async (req, res, next) => {
    try {
      let valor = req.query.valor;
      const reg = await models.Person.find(
        {
          $or: [
            { name: new RegExp(valor, "i") },
            { email: new RegExp(valor, "i") },
          ],
          person_type: "Supplier",
        },
        { createdAt: 0 }
      ).sort({ createdAt: -1 });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {

      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        {
          person_type: req.body.person_type,
          name: req.body.name,
          doc_type: req.body.doc_type,
          doc_num: req.body.doc_num,
          address: req.body.address,
          tel: req.body.tel,
          email: req.body.email,
        }
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
    const reg = await models.Person.findByIdAndDelete({ _id: req.body._id });
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
      const reg = await models.Person.findByIdAndUpdate(
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
      const reg = await models.Person.findByIdAndUpdate(
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
