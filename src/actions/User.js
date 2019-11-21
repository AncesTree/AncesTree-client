export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER = 'SET_USER';

export const setUserId = id => ({
    type: SET_USER_ID,
    id,
});

export const setUser = user => ({
   type: SET_USER,
   user
});