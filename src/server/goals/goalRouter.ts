import { router } from "../trpc";
import { getGoalRouter } from "./getGoalRouter";

export const goalRouter = router({
  getGoals: getGoalRouter.getGoal,
});
