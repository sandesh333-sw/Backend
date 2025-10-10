import { User } from "../models/user.models.js";
import { ApiError } from "..//utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationContent, sendEmail} from "../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user =   await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;

      await user.save({validateBeforeSave: false});
      return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong",

        )
    }
}

const registerUser = asyncHandler(async(req, res) => {
    const { email, username, password, role } = req.body;

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if(existingUser){
        throw new ApiError(409, "User with email or username already exists", []);
    }

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    });

    const {unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;

    user.emailVerificationExpiry = tokenExpiry;

    await user.save({validateBeforeSave: false});

    await sendEmail(
        {
            email: user?.email,
            subject: "Please verify your email",
            mailgenContent: emailVerificationContent(
                user.username,
                `{req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
            ),
        }
    );

    //- means i don't want this, default everything else is selected
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
            200,
            {user: createdUser},
            "User registered successfully with verification email sent"
        )
      )

});


export { registerUser};