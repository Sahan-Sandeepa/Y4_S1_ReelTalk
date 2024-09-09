import express from "express";
import {
    acceptFriendRequest,
    getMyFriends,
    getMyNotifications,
    getMyProfile,
    login,
    logout,
    newUser,
    searchUser,
    sendFriendRequest,
    getUsersAddedByMe,
} from "../controllers/User.js";
import {
    acceptRequestValidator,
    loginValidator,
    registerValidator,
    sendRequestValidator,
    validateHandler,
} from "../lib/Validatos.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { TryCatch } from "../middlewares/error.js";
import { singleAvatar } from "../middlewares/multer.js";
import { Request } from "../models/Request.js";
import { UserRequest } from "../models/UserRequest.js";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(), validateHandler, login);

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.get("/me", getMyProfile);

app.get("/logout", logout);

app.get("/search", searchUser);

app.put(
    "/sendrequest",
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest
);

app.put(
    "/acceptrequest",
    acceptRequestValidator(),
    validateHandler,
    acceptFriendRequest
);

app.get("/notifications/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const requests = await Request.find({
            $or: [{ sender: userId }, { receiver: userId }]
        }).select('notifications');

        const notifications = requests.flatMap(request => request.notifications);

        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/createRequest", TryCatch(async (req, res, next) => {
    const { parentUserId, groupName, receiverId } = req.body;

    let userRequest = await UserRequest.findOne({ receiverId });

    if (userRequest) {
        // Reset all fields if the receiver already exists
        userRequest.receiverName = null;
        userRequest.age = null;
        userRequest.isAccepted = false;
        userRequest.chats = [];
    } else {
        // Create new request
        userRequest = new UserRequest({ parentUserId, groupName, receiverId });
    }

    await userRequest.save();
    res.status(201).json({ success: true, data: userRequest });
}));

app.put("/updateReceiverDetails", TryCatch(async (req, res, next) => {
    const { receiverId, receiverName, age, isAccepted } = req.body;

    const userRequest = await UserRequest.findOne({ receiverId });

    if (!userRequest) {
        return next(new ErrorHandler("Request not found", 404));
    }

    userRequest.receiverName = receiverName;
    userRequest.age = age;
    userRequest.isAccepted = isAccepted;

    await userRequest.save();

    res.status(200).json({ success: true, message: "Receiver details updated", data: userRequest });
}));

app.get("/notifications", getMyNotifications);

app.get("/my-added-users", getUsersAddedByMe);

app.get("/friends", getMyFriends);

export default app;