import {GET_LINEAGE_BY_ID_URL} from "../conf/config";

export const FETCH_LINEAGE_SUCESS = 'FETCH_LINEAGE_SUCESS';
export const FETCH_LINEAGE_ERROR = 'FETCH_LINEAGE_ERROR';

export const fetchLineageSuccess = results => ({
    type: FETCH_LINEAGE_SUCESS,
    results,
});

export const fetchLineageFailure = error => ({
    type: FETCH_LINEAGE_ERROR,
    error,
});

export const fetchLineage = (id) => {
    return dispatch => {
        let completeUrl = GET_LINEAGE_BY_ID_URL.url + id

        return fetch(completeUrl, {
            headers: GET_LINEAGE_BY_ID_URL.header(),
            method: GET_LINEAGE_BY_ID_URL.method
        })
            .then(res => res.json())
            .then(res => {
                dispatch(fetchLineageSuccess(res));
                return res
            })
            .catch((error) => {
                dispatch(fetchLineageFailure(error))
            });
    }
}