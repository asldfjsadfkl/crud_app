const { default: axios } = require("axios");

export const refreshToken = async () => {
  try {
    const load = await axios.get("http:localhost:4000/user/me", {
      withCredentials: true,
    });
    console.log(load);
  } catch (error) {}
};
