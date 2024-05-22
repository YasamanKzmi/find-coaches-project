export default {
  async registerCoach(context, formData) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: formData.first,
      lastName: formData.last,
      areas: formData.areas,
      desciption: formData.desc,
      hourlyRate: formData.rate,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-coach-a87c4-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );

    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },

  async loadCoaches(context) {
    const response = await fetch(
      "https://vue-coach-a87c4-default-rtdb.firebaseio.com/coaches.json"
    );
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        desciption: responseData[key].desciption,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit("setCoaches", coaches);
  },
};
