const Validator = require("validator");
const validText = require("./valid_text");

module.exports = function validateCommentInput(comment)  {
    let errors = {}

    comment.body = validText(comment.body) ? comment.body : ""

    if (Validator.isEmpty(comment.body) ) {
        errors.body = "Comment body cannot be empty"
    }


    return {
       errors, 
       isValid: Object.keys(errors).length === 0
    }

}