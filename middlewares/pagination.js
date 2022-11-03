module.exports = () => (req, res, next) => {
    res.locals.page = req.query.page || 1;
    res.locals.limit = req.query.limit || 4;
    if(req.url.includes('next')) {
        res.locals.page = Number(res.locals.page) + 1; 
        //req.url = `/next?page=${res.locals.page}&limit=${res.locals.limit}`;
    }
    if(req.url.includes('previous')) {
        res.locals.page = Number(res.locals.page) - 1;
        //req.url = `/previous?page=${res.locals.page}&limit=${res.locals.limit}`;
    } 
    
    next();
};