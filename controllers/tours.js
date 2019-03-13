exports.getLanding = (req, res, next) =>{
    res.render('landing',{
        pageTitle: "travel assistant",
        path: '/'
    });
} 