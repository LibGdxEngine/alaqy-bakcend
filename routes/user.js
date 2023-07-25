const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  requireSignIn,
  adminMiddleware,
  logUserBehavior,
} = require("../controllers/auth");
const {
  read,
  publicProfile,
  update,
  photo,
  getUsersThatNeedConfirmations,
  confirmUser,
  rejectUser,
  getQuestions,
  getUsers,
  sendAcceptanceRequest,
  addFavourite,
  removeFavourite,
  checkInFavourites,
  acceptRequest,
  rejectRequest,
  makeRequestFailed,
  fetchRequest,
  setUserRoomStatus,
  getUsersReports,
  getFavourites,
  deactivate,
  activate,
  sendNotification,
  getMyRequests,
  createNewRequest,
  getMyPrivateRooms,
  getRoom,
  getMyOffers,
  getMyCategoryRequests,
  createNewOffer,
} = require("../controllers/user");

router.post(
  "/user/favourites",

  getFavourites
);
router.get("/user/profile", requireSignIn, authMiddleware, read);
router.get("/user/:username", publicProfile);
router.put("/user/update", requireSignIn, authMiddleware, update);
router.get("/user/photo/:username", photo);
router.post("/users", getUsers);
router.post(
  "/user/acceptance-request",
  requireSignIn,
  authMiddleware,
  logUserBehavior,
  sendAcceptanceRequest
);
router.post(
  "/user/accept-request",
  requireSignIn,
  authMiddleware,
  logUserBehavior,
  acceptRequest
);
router.post(
  "/user/reject-request",
  requireSignIn,
  authMiddleware,
  logUserBehavior,
  rejectRequest
);
router.post(
  "/user/failed-request",
  requireSignIn,
  authMiddleware,
  logUserBehavior,
  makeRequestFailed
);
router.post(
  "/user/in-favourite",
  requireSignIn,
  authMiddleware,
  checkInFavourites
);
router.post(
  "/user/add-favourite",
  requireSignIn,
  authMiddleware,
  logUserBehavior,
  addFavourite
);
router.post(
  "/user/remove-favourite",
  requireSignIn,
  authMiddleware,
  logUserBehavior,
  removeFavourite
);
router.post("/get-request", fetchRequest);
router.post("/set-user-room-status", setUserRoomStatus);
router.put("/deactivate", requireSignIn, authMiddleware, deactivate);
router.put("/activate", requireSignIn, authMiddleware, activate);
router.post(
  "/user/send-notification",
  requireSignIn,
  authMiddleware,
  sendNotification
);

router.post("/user/get-requests", requireSignIn, authMiddleware, getMyRequests);
router.post(
  "/user/get-category-requests",
  requireSignIn,
  authMiddleware,
  getMyCategoryRequests
);

router.post("/user/get-offers", requireSignIn, authMiddleware, getMyOffers);
router.post(
  "/user/create-request",
  requireSignIn,
  authMiddleware,
  createNewRequest
);

router.post(
  "/user/create-offer",
  requireSignIn,
  authMiddleware,
  createNewOffer
);

router.post(
  "/user/get-private-rooms",
  requireSignIn,
  authMiddleware,
  getMyPrivateRooms
);
router.post("/user/get-private-room", getRoom);

//Admin operations
router.get(
  "/users/need-confirmation",
  requireSignIn,
  adminMiddleware,
  getUsersThatNeedConfirmations
);
router.get("/users/reports", requireSignIn, adminMiddleware, getUsersReports);

router.put("/confirm", requireSignIn, adminMiddleware, confirmUser);
router.put("/reject", requireSignIn, adminMiddleware, rejectUser);
router.get("/user-questions", getQuestions);
module.exports = router;
