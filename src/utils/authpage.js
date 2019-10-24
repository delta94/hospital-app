export const isAuthPage = location => {
  if (location.pathname === "/register"
    || location.pathname === "/login")
    return false;

  return true;
}
