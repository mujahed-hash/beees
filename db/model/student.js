const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({

    studentId:{
        type:String,
        // require:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name:String,
    dob:String,
    course:String,
    duration:String,
    passingyear:String,
    image:{
        type:String,
        require:true
    }

});
studentSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

studentSchema.set('toJSON',{
    virtuals: true,
});
module.exports = mongoose.model('student', studentSchema);