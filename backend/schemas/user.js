const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    orgHandle: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    starred: [{
        type: String
    }]
});

userSchema.index({ firstName: "text", lastName: "text" });


userSchema.methods.logFullName = function () {
  console.log(this.firstName + this.lastName);
}

userSchema.methods.findByEmail = function() {
  return this.model('User').find({ email: this.email });
};

userSchema.methods.saveAndFind = () => {
  debugger
  const self = this;
  self.save(function(err) {
    if(err) throw err;
    return User.findByEmail();
  })
};


module.exports = userSchema;
