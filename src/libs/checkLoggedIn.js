const checkLoggedIn = (req, res, next) => {
    const { user } = res.locals;
    if(!user) {
        return res.status(401).end() 
    }
    
    return next();
}