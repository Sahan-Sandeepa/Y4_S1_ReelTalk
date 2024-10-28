import mongoose, { Schema, model, Types } from "mongoose";

const userRequestSchema = new Schema(
    {
        parentUserId: { type: Types.ObjectId, ref: "User", required: true },
        groupName: { type: String, required: true },
        receiverId: { type: Types.ObjectId, ref: "User", required: true },
        receiverName: { type: String, default: null },
        age: { type: Number, default: null },
        isAccepted: { type: Boolean, default: false },
        chats: [
            {
                chatId: { type: String, default: null },
                URL: { type: String, default: null },
                isApproved: { type: Boolean, default: false }
            }
        ],
    },
    { timestamps: true }
);

export const UserRequest = mongoose.models.UserRequest || model("UserRequest", userRequestSchema);
