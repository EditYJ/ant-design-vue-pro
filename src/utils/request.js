import { notification } from "ant-design-vue";
import axios from "axios";

function request(options) {
  return axios(options)
    .then(res => {
      notification.success({
        message: "成功",
        description: "success!!"
      });
      return res;
    })
    .catch(error => {
      const {
        respose: { status, statusText }
      } = error;
      notification.error({
        message: status,
        description: statusText
      });
      return Promise.reject(error);
    });
}

export default request;
