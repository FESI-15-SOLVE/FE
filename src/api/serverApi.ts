import { Auth } from "./Auth";
import { Favorites } from "./Favorites";
import { Images } from "./Images";
import { MeetingTypes } from "./MeetingTypes";
import { Meetings } from "./Meetings";
import { Notifications } from "./Notifications";
import { Og } from "./Og";
import { Posts } from "./Posts";
import { Reviews } from "./Reviews";
import { Users } from "./Users";

class ServerApi {
  public readonly auth = new Auth();
  public readonly favorites = new Favorites();
  public readonly images = new Images();
  public readonly meetingTypes = new MeetingTypes();
  public readonly meetings = new Meetings();
  public readonly notifications = new Notifications();
  public readonly og = new Og();
  public readonly posts = new Posts();
  public readonly reviews = new Reviews();
  public readonly users = new Users();
}

const serverApi = new ServerApi();

export default serverApi;
