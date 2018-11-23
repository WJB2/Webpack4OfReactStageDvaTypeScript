/**
 * 判定用户是否已经登录
 */
function isAuthenticated(){
    return localStorage.getItem('session');
}

