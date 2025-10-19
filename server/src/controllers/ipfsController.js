const contentModel = require('./../models/Content');
const userModel = require('./../models/User');
const { v4: uuidV4 } = require('uuid');

exports.getContent = async (req, res) => {
  const cid = req.params.id;
  try {
    const result = await contentModel.findOne({hash: cid}).exec();
    res.send({success: true, content: result.data})
  }
  catch (error) {
    console.error(error);
    res.status(500).send({success: false});
  }

};

exports.addContent = async (req, res) => {
  
  const userAddress = req.params.userAddress;

  const cid = uuidV4();
  try {
    const user = await userModel.findOne({walletAddress: userAddress});
    if (!user._id) {
      return res.status(401).json({success: false, message: 'You are not authorized'});
    }
    const result = await contentModel.create({hash: cid, data: req.body.buffer, owner: user._id});
    res.send({success: true, hash: cid});
  }
  catch (error) {
    console.error(error);
    res.status(500).send({success: false});
  }

};

exports.deleteContent = async (req, res) => {
  const cid = req.params.id;
  try {
    const result = await contentModel.deleteOne({hash: cid}).exec();
    res.send({success: true})
  }
  catch (error) {
    console.error(error);
    res.status(500).send({success: false});
  }
};