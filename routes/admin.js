
/*
 * GET users listing.
 */

exports.index = function(req, res,next){
    res.render('admin/index',{layout:'admin/layout'});
    //TODO 补500 404
//    next("this is admin error");
};