const mongoose = require("mongoose");
const crypto = require("crypto");

const CONFIRMATIONS_STATUS = {
  PENDING: 0,
  CONFIRMED: 1,
  REJECTED: 2,
  DEACTIVATED: 3,
  BLOCKED: 4,
};

const USER_STATUS = {
  NORMAL: 0,
  RELATED_WITH_SOMEONE: 1,
};

const userSchema = mongoose.Schema(
  {
    phone: {
      type: String,
      //   required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    
    requests: [{ type: mongoose.ObjectId, ref: "Request", required: false }],
    salt: String,
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true, collection: "testUsers" }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;

    // generate salt
    this.salt = this.makeSalt();

    //encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";

    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
