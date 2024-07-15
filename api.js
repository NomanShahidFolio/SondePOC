import axios from "axios";
import base64 from "react-native-base64";

const BASE_URL = "https://api.sondeservices.com/platform/v1";
const CLIENT_ID = "7cr51u8s83f8fpa4b95hqs91pu";
const CLIENT_SECRET = "1v3arl0v6qn1135gk11ltu8g3498ovr48kn6rd7nesb7mddi58at";

const getToken = async () => {
  const authString = `${CLIENT_ID}:${CLIENT_SECRET}`;
  const encodedAuthString = base64.encode(authString);

  try {
    const response = await axios.post(
      `${BASE_URL}/oauth2/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedAuthString}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Token retrieval error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const getQuestionnaires = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/measures`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: {
        page: 1,
        pageSize: 50,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Get questionnaires error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export { getToken, getQuestionnaires };
