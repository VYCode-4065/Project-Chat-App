const SummaryApi = {
    signUp: {
        url: "/api/user/signup",
        method: "POST",
    },
    login: {
        url: "/api/user/login",
        method: "POST",
    },
    logout: {
        url: "/api/user/logout",
        method: "GET",
    },
    getParticipants: {
        url: "/api/user/sidebarUser",
        method: "GET",
    },
    sendMessage: {
        url: "/api/message/send",
        method: "POST",
    },

}

export default SummaryApi;