
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
   console.log("in action")
   return (dispatch) => {
   let baseUrl = "https://ancestree-api-neo4j.igpolytech.fr/api/query/lineage/"
   let completeUrl = baseUrl + id

   return fetch(completeUrl, {
      method: "GET"
   })
      .then((response) => {
         if (response.status >= 400) {
            const errorMessage = `Fetching ${completeUrl} status: ${response.status}`;
            dispatch(fetchLineageFailure(errorMessage));
            throw new Error(errorMessage);
         }
         console.log(response)
         return response.json();
      })
      .then(json => dispatch(fetchLineageSuccess(JSON.parse(json))))
      .catch((error) => {
         console.log(error)
         dispatch(fetchLineageFailure  (error))
      });
   }
}