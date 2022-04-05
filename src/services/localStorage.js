export const setToken = (token) => {
    localStorage.setItem("Token", JSON.stringify(token));
}

export const getAccessToken = ()=> {
    const itemStr = localStorage.getItem("Token");
    if(!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr);
    return item;
}