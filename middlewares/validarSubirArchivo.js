const validarArchivoInReq = (req, res, next) => {
  if (!req.files || !req.files.archivo) {
    return res.status(400).json({ msg: "archivo no adjintado" });
  }
  next();
};

module.exports = {validarArchivoInReq}