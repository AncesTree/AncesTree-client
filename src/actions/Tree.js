import Neo4jAPIService from "../services/Neo4jAPIService";

export const FETCH_LINEAGE_SUCESS = 'FETCH_LINEAGE_SUCESS';
export const FETCH_LINEAGE_ERROR = 'FETCH_LINEAGE_ERROR';

export const FETCH_RESEARCH_SUCESS = 'FETCH_RESEARCH_SUCESS';
export const FETCH_RESEARCH_ERROR = 'FETCH_RESEARCH_ERROR';


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


export const fetchResearchSuccess = results => ({
    type: FETCH_RESEARCH_SUCESS,
    results
})

export const fetchResearchFailure = error => ({
    type: FETCH_RESEARCH_ERROR,
    error,
});

export const fetchResearch = (search) => {
    return dispatch => {
        Neo4jAPIService.searchUsers(search)
            .then(res => {dispatch(fetchResearchSuccess(res))})
            .catch(err => {dispatch(fetchResearchFailure(err))});
    }
};