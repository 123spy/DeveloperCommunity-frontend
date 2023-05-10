/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import {CurrentUser} from "@/modals/User";

export default function access(initialState: { currentUser?: CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.userRole === 'admin',
    canUser: currentUser !== null && currentUser !== undefined && currentUser?.id !== null && currentUser?.id !== undefined
  };
}
