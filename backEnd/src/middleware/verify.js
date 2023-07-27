const jwt = require('jsonwebtoken');

const auth = async(req, res, next)=>{
    try{
    let { token } = req.body;
    jwt.verify(token , 'ourvalues' , (err, decoded) => {
        if (err) {
          return res.sendStatus(403); // Forbidden
        }
        const role = {role:decoded.role};
        const userid = {userid:decoded.userid};
    
        req.user = [role , userid];
        next();
    });
    }
    catch(err){
        res.status(401).json({
            error:'token is not valid'
        })
    }
};

module.exports = auth