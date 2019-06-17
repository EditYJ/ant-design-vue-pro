/// 权限相关的基本方法

/// 得到当前的用户权限
export function getCurrentAutority() {
  return ["admin"];
}

/// 检查当前权限是否符合需要的权限
/// authority: 需要的权限(List)
/// return: 当前权限是否符合需要的权限(bool)
export function checkAuthority(authority) {
  const currentAuthority = getCurrentAutority();
  return currentAuthority.some(item => authority.includes(item));
}

/// 检查当前是否为登录状态
/// 如果获取到了权限且权限不为'guest'则认为已经登陆
export function isLogin() {
  const currentAuthority = getCurrentAutority();
  return currentAuthority && currentAuthority != "guest";
}
