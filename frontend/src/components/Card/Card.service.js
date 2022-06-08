import axios from "axios";

export const CardSerivce = {
  add: (product) => {
    return axios.post("/api/shop/card", product);
  },
};
