const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    apptDate : {
        type : Date,
        required : true
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    massageshop : {
        type : mongoose.Schema.ObjectId,
        ref : `Massageshop`,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
}, {
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);
export default Reservation