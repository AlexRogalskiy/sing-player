import { NETWORK_STATUS } from "../constants/ActionTypes";
import { UPDATE_PROPERTY } from "../constants/Actions";

export class NetworkAction {
    public static fetching(key: string) {
        return dispatch => dispatch({
            type: NETWORK_STATUS,
            action: UPDATE_PROPERTY,
            path: key,
            data: { loading: true, nodata: false }
        });
    }

    public static success(key: string, nodata: boolean = false) {
        return dispatch => dispatch({
            type: NETWORK_STATUS,
            action: UPDATE_PROPERTY,
            path: key,
            data: { loading: false, nodata }
        });
    }
}
