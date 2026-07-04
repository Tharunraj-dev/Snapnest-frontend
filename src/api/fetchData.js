import api from "./../services/api";

const fetchData = async () => {
  return await api.get("/api/account/profile");
};

export default fetchData;
