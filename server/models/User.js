import mongoose, { Schema, model, Types } from "mongoose";
import { hash } from "bcrypt";

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        avatar: {
            public_id: {
                type: String,
                required: false,
            },
            url: {
                type: String,
                required: false,
            },
        },
        age: {
            type: Number,
            required: true,
        },
        createdBy: { 
            type: Types.ObjectId, ref: "User", default: null 
        },
    },
    {
        timestamps: true,
    }
);

schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await hash(this.password, 10);
});

export const User = mongoose.models.User || model("User", schema);