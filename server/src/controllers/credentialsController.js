const credentialModel = require("./../models/Credential");

exports.getCredentials = async (req, res) => {
  const { address, type } = req.query;
  try {

    const result = await credentialModel.find({owner: address, type}).exec();
    
    console.log(`result: ${result}`)
    res.send({
      success: true,
      credential: result.map((credential) => {return {
        title: credential.title,
        type: credential.type,
        key: credential.key,
    }})
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false });
  }
};

exports.addCredential = async (req, res) => {
  const { title, type, key, address } = req.body;
  
  try {
    
    const result = await credentialModel.create({
      title,
      type,
      key, 
      owner: address
    });
    res.send({ success: true, credential: {title, type} });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false });
  }
};
