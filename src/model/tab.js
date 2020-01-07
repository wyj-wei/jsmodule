import config from "../utils/config";
import { HTTP } from "../utils/http";

class TabModel extends HTTP {

  async getListData(cityId) {
    return this.ajaxPost({
      url: config.API.GET_LIST_DATAS,
      data: {
        cityId,
        field: "food"
      },
      success(data) {
        return {
          data,
          status: 0
        };
      },
      error(error) {
        return {
          error,
          status: -1
        };
      }
    });
  }
}

export { TabModel}
