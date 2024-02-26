import defaultAxios from "../../api/axios";

export const addTraker = async (body) => {
  return new Promise((onSucces, onFail) => {
    defaultAxios
      .post('/traker', body)
      .then((response) => {
        if (!response) {
          onFail(`Probleme de connexion au serveur`);
        } else {
          onSucces(response.data);
        }
      })
      .catch((error) => {
        if (error) {
          onFail(`Probleme de connexion au serveur`);
        }
      });
  });
};