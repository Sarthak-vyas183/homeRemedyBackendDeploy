const RemedyModel = require("../models/RemedyModel")
const UserModel = require("../models/userModel") 
const ReviewModel = require("../models/CommentModel");
const userModel = require("../models/userModel");

const GetAllRemedies = async (req , res) => {
    const remedies = await RemedyModel.find({isVerified : true}); 
    res.status(200).json({msg : "remedy found", data : remedies});
}

const userverification = async(req , res) => {
    const userdata = req.user;
    res.status(200).json({msg : "token verified" , userdata })
}

const remedydetail = async(req , res) => {
     try {
        const  remedyId = req.params.id
         const remedy = await RemedyModel.findOne({_id : remedyId});
           if(!remedy) {
             return res.status(404).json({msg : "remedyDetail Not found" });
           }
           const owner  = await UserModel.findOne({_id : remedy.userId}).select("-password");
           
           if(!owner) {
            res.status(200).json({msg : "remedy found success", remedydetail : remedy});
           }
          
        res.status(200).json({msg : "remedy found success", remedydetail : remedy , ownerdata : owner});
     } catch (error) {
        res.status(500).json({msg : "Internal server error" , err : error})
     }
} 

const remedyReview = async (req, res) => {
  const { comment, RemedyId } = req.body;

  // Check if required fields are present
  if (!comment || !RemedyId) {
    return res.status(400).json({ msg: "Required fields are missing" });
  }

  try {
    // Ensure userId is not null or undefined
    if (!req.userId) {
      return res.status(400).json({ msg: "User ID is missing" });
    }

    // Create the review
    const newReview = await ReviewModel.create({ RemedyId, userId: req.userId, comment });

    if (!newReview) {
      return res.status(500).json({ msg: "Failed to post review" });
    }

    res.json({ msg: "Review posted successfully" });
  } catch (error) {
    // Log error details and send appropriate error response
    console.error("Error posting review:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

const showComments = async (req, res) => {
  try {
    const response = await ReviewModel.find({ RemedyId: req.body.RemedyId }).select("-password");
    
    if (response.length === 0) {
      return res.status(404).send("No Remedy found");
    }
    
    res.status(200).json({ msg: "Remedy found", data: response });
  } catch (error) {
    res.status(500).json({ msg: "Server error occurred", err: error.message });
  }
};

const showCommenter = async (req , res) => {
     try {
       const user = await userModel.findOne({_id : req.body.user})
     
       if(!user) return res.status(404).send("not found : user")
         
       res.status(200).json({commenter : user})
     } catch (error) {
        res.send("commenter not found")
     }
}

const bookmarkRemedy = async (req , res) => {
          try {
            const user = await userModel.findOne({_id : req.userId});
           if(!user) return res.status(404).json({msg : "User not found"})

           const remedyIdx = user.bookMarks.indexOf(req.body.RemedyId);
            if(remedyIdx != -1) {
              user.bookMarks.splice(remedyIdx , 1);
              await user.save()
             return res.status(403).json({msg :"Remedy deleted"});
            }
            user.bookMarks.push(req.body.RemedyId);
           await user.save()
           res.status(200).json({msg : "remedy saved success"});
           } catch (error) {
              res.json({msg : 'server error' , err : error})
           }
}

const bookmarkornot = async (req , res) => {
  try {
  const user = await userModel.findOne({_id : req.userId});
   if(!user) return res.status(404).json({msg : "User not found"})

   const remedyIdx = user.bookMarks.indexOf(req.body.RemedyId);
   console.log(remedyIdx)
    if(remedyIdx != -1) {
      return res.status(403).json({msg :"remedy Exist !"});
    }

   res.status(200).json({msg : "Remedy not Exist"}); 

   } catch (error) {
      res.status(404).json({msg : 'server error' , err : error})
   } 
}
 

module.exports =  {GetAllRemedies , userverification , remedydetail , remedyReview , showComments , showCommenter , bookmarkRemedy , bookmarkornot};
