import express from "express";
import {
    addMembers,
    deleteChat,
    getChatDetails,
    getMessages,
    getMyChats,
    getMyGroups,
    leaveGroup,
    newGroupChat,
    removeMember,
    renameGroup,
    sendAttachments,
    fetchMoviePoster,
} from "../controllers/chat.js";
import {
    addMemberValidator,
    chatIdValidator,
    newGroupValidator,
    removeMemberValidator,
    renameValidator,
    sendAttachmentsValidator,
    validateHandler,
} from "../lib/Validatos.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { TryCatch } from "../middlewares/error.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { UserRequest } from "../models/UserRequest.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

app.put(
    "/removemember",
    removeMemberValidator(),
    validateHandler,
    removeMember
);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// Send Attachments
app.post(
    "/message",
    attachmentsMulter,
    sendAttachmentsValidator(),
    validateHandler,
    sendAttachments
);

// Get Messages
app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

app.get('/api/fetchPoster', fetchMoviePoster);

// Get Chat Details, rename,delete
app
    .route("/:id")
    .get(chatIdValidator(), validateHandler, getChatDetails)
    .put(renameValidator(), validateHandler, renameGroup)
    .delete(chatIdValidator(), validateHandler, deleteChat);

app.get("/getAcceptanceState/:receiverId", TryCatch(async (req, res, next) => {
    const { receiverId } = req.params;

    const userRequest = await UserRequest.findOne({ receiverId });

    if (!userRequest) {
        return next(new ErrorHandler("Request not found", 404));
    }

    res.status(200).json({ success: true, isAccepted: userRequest.isAccepted });
}));

app.put("/updateChatDetails", TryCatch(async (req, res, next) => {
    const { groupName, chatId, receiverId, URL } = req.body;
    // Validate input fields
    if (!groupName || !chatId || !receiverId || !URL) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    // Validate receiverId format
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
        return next(new ErrorHandler("Invalid receiverId format", 400));
    }
    const validReceiverId = mongoose.Types.ObjectId(receiverId);
    const userRequest = await UserRequest.findOne({ receiverId: validReceiverId, groupName });

    if (!userRequest) {
        return next(new ErrorHandler("Request not found", 404));
    }
    const chatIndex = userRequest.chats.findIndex(chat => chat.chatId === chatId);

    if (chatIndex > -1) {
        userRequest.chats[chatIndex].URL = URL;
        userRequest.chats[chatIndex].isApproved = false;
    } else {
        // Add a new chat record to chats array
        userRequest.chats.push({ chatId, URL, isApproved: false });
    }
    await userRequest.save();

    res.status(200).json({ success: true, message: "Chat details updated", data: userRequest });
}));

app.put("/setApproval", TryCatch(async (req, res, next) => {
    const { receiverId, chatId, isApproved } = req.body;

    const userRequest = await UserRequest.findOne({ receiverId });

    if (!userRequest) {
        return next(new ErrorHandler("Request not found", 404));
    }

    const chat = userRequest.chats.find(chat => chat.chatId === chatId);

    if (!chat) {
        return next(new ErrorHandler("Chat details not found", 404));
    }

    chat.isApproved = isApproved;

    await userRequest.save();

    res.status(200).json({ success: true, message: "Approval status updated", data: chat });
}));

app.get("/getChatDetails/:receiverId/:chatId", TryCatch(async (req, res, next) => {
    const { receiverId, chatId } = req.params;

    const userRequest = await UserRequest.findOne({ receiverId });

    if (!userRequest) {
        return next(new ErrorHandler("Request not found", 404));
    }

    const chat = userRequest.chats.find(chat => chat.chatId === chatId);

    if (!chat) {
        return next(new ErrorHandler("Chat details not found", 404));
    }

    res.status(200).json({ success: true, data: chat });
}));

app.get("/getApprovalStatus/:receiverId/:chatId", TryCatch(async (req, res, next) => {
    const { receiverId, chatId } = req.params;

    const userRequest = await UserRequest.findOne({ receiverId });

    if (!userRequest) {
        return next(new ErrorHandler("Request not found", 404));
    }

    const chat = userRequest.chats.find(chat => chat.chatId === chatId);

    if (!chat) {
        return next(new ErrorHandler("Chat details not found", 404));
    }

    res.status(200).json({ success: true, isApproved: chat.isApproved });
}));

export default app;