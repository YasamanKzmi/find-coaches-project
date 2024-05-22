import requests from ".";

export default {
  async contactCoach(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-coach-a87c4-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to send request!"
      );
      throw error;
    }

    newRequest.coachId = payload.coachId;

    context.commit("addRequest", {
      ...newRequest,
      id: responseData.name,
    });
  },

  async fetchRequests(context, rootGetters) {
    const coachId = context.rootGetters.userId;
    const token= context.rootGetters.token
    const response = await fetch(
      `https://vue-coach-a87c4-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=`+token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch requests!"
      );
      throw error;
    }

    const requests = []
    for(const key in responseData){
      const request = {
        id: key,
        coachId: coachId,
        email: responseData[key].email,
        message: responseData[key].message
      }
      requests.push(request)
    }


    context.commit('setRequests', requests)
  },
};
