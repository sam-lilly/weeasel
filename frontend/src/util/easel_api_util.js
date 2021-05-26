import axios from 'axios';

export const fetchEasels = (boardId) => {
    return axios.get(`/api/drawingBaords/${boardId}/easels`)
};

// export const fetchEasel = (easelId) => {
//     return axios.get(`/api/easels/${easelId}`)
// };

export const createEasel = (boardId, easel) => {
    return axios.post(`/api/drawingBaords/${boardId}/easels`, easel)
};

export const updateEasel = (boardId, easelId, easel) => {
    return axios.patch(`/api/drawingBaords/${boardId}/easels/${easelId}`, easel)
}

export const deleteEasel = (boardId, easelId) => {
    return axios.delete(`/api/drawingBaords/${boardId}/easels/${easelId}`)
};


/*ref
Axios.get(
 `/api/resources/products/category-id/?categoryId=${categoryId}`,
 {
   baseURL: '/',
   headers: {
     'Content-Type': CONTENT_TYPE_JSON_VALUE,
  },
}
*/
