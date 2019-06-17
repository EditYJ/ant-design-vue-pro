import { notification } from "ant-design-vue";
import axios from "axios";

function request(options) {
  return axios(options)
    .then(res => {
      notification.success({
        //eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            <span style="color: green">成功</span>
          </div>
        ),
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
