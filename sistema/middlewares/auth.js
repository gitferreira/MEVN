import tokenService from "../services/token";

export default {
  verifyUser: async (req, res, next) => {
    //Why headers?
    if (!req.headers.token) {
      res.status(404).send({
        message: "No token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (
      response.role == "Admin" ||
      response.role == "Vendor" ||
      response.role == "Wharehouse"
    ) {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
  verifyAdmin: async (req, res, next) => {
    if (!req.headers.token) {
      res.status(404).send({
        message: "No token bitch",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == "Admin") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
  verifyWharehouse: async (req, res, next) => {
    if (!req.headers.tokerm) {
      res.status(404).send({
        message: "No token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == "Admin" || response.role == "Wharehouse") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
  verifyVendor: async (req, res, next) => {
    if (!req.headers.tokerm) {
      res.status(404).send({
        message: "No token",
      });
    }
    const response = await tokenService.decode(req.headers.token);
    if (response.role == "Admin" || response.role == "Vendor") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized",
      });
    }
  },
};
