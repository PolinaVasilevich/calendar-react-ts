import { AuthActionCreators } from "./auth/action-creators";
import { EventActionCreators } from "./event/action-creaters";

export const allActionCreators = {
  ...AuthActionCreators,
  ...EventActionCreators,
};
