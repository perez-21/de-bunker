const userModel = require("./../models/User");

exports.getUser = async (req, res) => {
  const walletAddress = req.params.address;
  try {
    const result = await userModel.findOne({ walletAddress: walletAddress }).exec();
    res.send({
      success: true,
      user: {
        walletAddress: result.walletAddress,
        publicKey: result.publicKey,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false });
  }
};

exports.addUser = async (req, res) => {
  const { walletAddress, publicKey } = req.body;
  
  try {
    
    const result = await userModel.create({
      walletAddress,
      publicKey,
    });
    res.send({ success: true, user: {walletAddress, publicKey} });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false });
  }
};
