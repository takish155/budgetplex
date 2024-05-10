import { router } from "../trpc";
import { isVerifiedRouter } from "./isVerifiedRouter";
import { verifyResetPasswordTokenRouter } from "./verifyResetPasswordTokenRouter";

export const verificationRouter = router({
  isVerified: isVerifiedRouter.isVerified,
  verifyResetPasswordToken:
    verifyResetPasswordTokenRouter.verifyResetPasswordToken,
});
