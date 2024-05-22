let timer;
export default {
  async login(context, payload) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKm0DXOaG1b1jNcaxDzfjnVp3pO3Tgj6s",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }
    // local storage
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function(){
      context.dispatch('autoLogout');
    },expiresIn)

    console.log(responseData);
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  async signup(context, payload) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKm0DXOaG1b1jNcaxDzfjnVp3pO3Tgj6s",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to authenticate");
      throw error;
    }
    console.log(responseData);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime

    if(expiresIn < 0){
      return;
    }

    timer = setTimeout(function(){
      context.dispatch('autoLogout')
    },expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
    });
  },
  autoLogout(context){
    context.dispatch('logout')
    context.commit('setAutoLogout')
  }
};
