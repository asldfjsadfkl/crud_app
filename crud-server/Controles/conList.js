const LIST = require("../MongoDB/listModel.js");

exports.create = async (req, res) => {

  const list = await LIST.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email
  });
  res.status(201).json({
    success: true,
    message: "Saved",
    list,
  });
};

exports.Delete = async (req, res) => {
  try {
    const list = await LIST.findById(req.params.id);
    if (!list) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    await LIST.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};





exports.Update = async (req, res) => {
  try {
    const list = await LIST.findById(req.params.id);
    if (!list) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    const update = await LIST.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Updated",
      update,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetOne = async (req, res) => {
  try {
    const list = await LIST.findById(req.params.id);
    if (!list) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    const list1 = await LIST.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Got One",
      list1,
    });
  } catch (error) {
    console.log(error);
  }
};


exports.GetAll = async (req, res) => {
  const lists = await LIST.find();
  res.status(200).json({
    success: true,
    message: "All Data",
    lists,
  });
};
