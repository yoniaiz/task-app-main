import store from "../../redux/store";
import { showNotification } from "../toastNotifications";

const LOADING = "LOADING";
const LOADING_DONE = "LOADING_DONE";

export default class Dispatcher {
  constructor(request, success, failure) {
    this._dispatch = store.dispatch;
    this._request = request ? request : "";
    this._success = success ? success : `${this._request}_SUCCESS`;
    this._error = failure ? failure : `${this._request}_FALIURE`;
  }

  get action() {
    return this.request;
  }

  set action(action) {
    this.setRequestActions(action);
  }

  setRequestActions(action) {
    if (action) {
      this._request = action;
      this._success = `${this._request}_SUCCESS`;
      this._error = `${this._request}_FALIURE`;
    }
  }

  request(loading, main) {
    if (loading) {
      this.loading(main);
    }

    this._dispatch({
      type: this._request,
    });
  }

  loading(main) {
    if (main) {
      this._dispatch({
        type: "MAIN_LOADER",
      });
    } else {
      this._dispatch({
        type: LOADING,
      });
    }
  }

  success(payload) {
    this._dispatch({
      type: this._success,
      ...payload,
    });
  }

  failure(error = {}) {
    this.showToast("error", error.message || error._message);
    this._dispatch({
      type: this._error,
      error,
    });
  }

  showToast(type = "error", message) {
    if (message) showNotification(message ? message : "Bad Request", type);
  }

  loadingDone() {
    this._dispatch({
      type: LOADING_DONE,
    });
  }
}
