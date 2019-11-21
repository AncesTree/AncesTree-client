import Neo4jAPIService from "../services/Neo4jAPIService";

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
        Neo4jAPIService.getLineageById(id)
            .then(res => {dispatch(fetchLineageSuccess(res))})
            .catch(err => {dispatch(fetchLineageFailure(err))});
    }
};