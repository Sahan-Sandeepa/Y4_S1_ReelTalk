import mongoose, { Schema, model, Types } from "mongoose";

const chatSchema = new Schema({
    chatId: { type: String, default: null },
    URL: { type: String, default: null },
    isApproved: { type: Boolean, default: false }, // Set initially to false
});

const userRequestSchema = new Schema(
    {
        parentUserId: { type: Types.ObjectId, ref: "User", required: true }, // Parent user
        groupName: { type: String, required: true },
        receiverId: { type: Types.ObjectId, ref: "User", required: true }, // Receiver user ID
        receiverName: { type: String, default: null }, // Initially null
        age: { type: Number, default: null }, // Initially null
        isAccepted: { type: Boolean, default: false }, // Initially false
        chats: [chatSchema], // List of chat details
    },
    { timestamps: true }
);

export const UserRequest = mongoose.models.UserRequest || model("UserRequest", userRequestSchema);
