
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
        let baseUrl = "https://ancestree-api-neo4j.igpolytech.fr/api/query/lineage/"
        let completeUrl = baseUrl + id

        return fetch(completeUrl, {
            method: "GET"
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