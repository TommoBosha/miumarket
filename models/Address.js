import { model, models, Schema } from "mongoose";

const AddressSchema = new Schema({
    userEmail: { type: String, unique: true, required: true },
    name: { type: String,  required: true },
    email: { type: String,  required: true },
    city: { type: String,  required: true },
    postalCode: { type: String,  required: true },
    streetAddress: { type: String,  required: true },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\+380\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    country:{ type: String,  required: true },
},
{
    timestamps: true,
})

export const Address = models?.Address || model('Address', AddressSchema);