const mongoose = require('mongoose');

const MassageshopSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please add a name'],
        unique : true,
        trim : true,
        maxlength : [50, 'Name can not be more than 50 characters']
    },
    address : {
        type : String,
        required : [true, 'Please add an address']
    },
    tel : {
        type : String
    },
    openclosetime: {
        open: { type: String, required: true },
        close: { type: String, required: true }
    }

}, {
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

const Massageshop = mongoose.models.Massageshop || mongoose.model("Massageshop", MassageshopSchema);
export default Massageshop