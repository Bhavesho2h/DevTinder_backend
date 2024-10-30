 const adminAuth = (req,res,next)=>{
    const token = 'abc';
    const authorized = token;
    if(authorized){
        next();
    }
    else{
        res.status(401).send('Unauthorized User')
    }
};

module.exports = {
    adminAuth
}