const tb_user = require("../models").User;
const tb_follow = require("../models").Follow;

exports.addFollows=async (req,res,next) => {
    console.log ("function Follows...");

    let input={
        user_id: req.userId,
         following_user_id: req.body.following_user_id
     
     }
     console.log(input.following_user_id);
        try {
         let follows = await tb_user.findOne({
             where: {
                 id : input.following_user_id
             }
         });
         if (!follows) {
             res.status(404).json({
                 msg: "Not Found"
             });
        } else {
            tb_follow.create(input).then(dataFollow => {
                tb_user
                    .findOne({
                        where: {
                            id: dataFollow.following_user_id
                        }
                    }).then(data => {
                        res.status(200).json({
                            msg: "You Following :",
                            Article: data
                        });
                            }) .catch(err => {
                                res.status(400).json({
                                    msg: "Bad Request",
                                    Error: err
                                });
                            })
                        }
                        )}
                    } catch(e){
         next(e);
     }
}


        

    
    
        
            
    