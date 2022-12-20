import http from "../http-common";
import IMeteorlogData from "../types/meteorlog.type"

class MeteorlogDataService {
  getAll() {
    return http.get<Array<IMeteorlogData>>("/meteorlogs");
  }

  deleteAll() {
    return http.delete<any>(`/meteorlogs`);
  }

  findByDate(startDate: Date, endDate: Date) {
    return http.get<Array<IMeteorlogData>>(`/meteorlogs?startDate=${startDate}&endDate=${endDate}`);
  }
}

export default new MeteorlogDataService();