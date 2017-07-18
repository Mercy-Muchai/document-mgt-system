import toastr from "toastr";
import { ALL_DOCUMENTS_SUCCESS, POST_DOCUMENTS_SUCCESS, UPDATE_DOCUMENTS_SUCCESS,
   DELETE_DOCUMENTS_SUCCESS, SEARCH_DOCUMENTS_SUCCESS, PUBLIC_DOCUMENTS_SUCCESS, PAGINATE_DOCUMENTS_SUCCESS } from './actionTypes';
import { postEndpoint, getEndpoint, deleteEndpoint, putEndpoint } from "../api/consumeApi";

export function allDocumentsSuccess(documents) {
  return { type: ALL_DOCUMENTS_SUCCESS, documents };
}

export function postDocumentsSuccess(document) {
  return { type: POST_DOCUMENTS_SUCCESS, document };
}
export function updateDocumentsSuccess(document) {
  return { type: UPDATE_DOCUMENTS_SUCCESS, document };
}
export function deleteDocumentsSuccess(document) {
  return { type: DELETE_DOCUMENTS_SUCCESS, document };
}
export function searchDocumentsSuccess(pages) {
  return { type: SEARCH_DOCUMENTS_SUCCESS, pages };
}
export function publicDocumentsSuccess(documents){
    return { type: PUBLIC_DOCUMENTS_SUCCESS, documents };
}
export function paginateDocumentsSuccess(pages){
    return { type: PAGINATE_DOCUMENTS_SUCCESS, pages };
}
const token = localStorage.getItem('jwt');
const userId = localStorage.getItem('userId');

export function allDocuments() {
  return (dispatch) => {
    getEndpoint(`/api/documents`)
      .set('access-token', token)
      .end((err, res) => dispatch(allDocumentsSuccess(res.body)
      ));
  };
}

export function paginateDocuments(limit = 10, offset = 0) {
  return (dispatch) => {
    getEndpoint(`/api/documents/?limit=${limit}&offset=${offset}`)
      .set('access-token', token)
      .end((err, res) => dispatch(paginateDocumentsSuccess(res.body)
      ));
  };
}

export const publicDocuments = () => (dispatch) => {
  getEndpoint('/api/documents/public')
    .end((err, res) => {
      dispatch(publicDocumentsSuccess(res.body));
    });
};

export function postDocuments(documents) {
  return (dispatch) => {
    postEndpoint('/api/documents')
      .send(documents)
      .set('access-token', token)
      .end((err, res) => { toastr.success(res.body.message),
      dispatch(postDocumentsSuccess({ documents: res.body })
      );
  });
  };
}

export function updateDocuments(documents) {
  return (dispatch) => {
    putEndpoint(`/api/documents/${documents.id}`)
      .set('access-token', token)
      .send(documents)
      .end((err, res) => {toastr.success(res.body.message),
        dispatch(updateDocumentsSuccess({ documents: res.body })
      );
    });
  };
}

export function deleteDocuments(documents) {
  return (dispatch) => {
    deleteEndpoint(`/api/documents/${documents.id}`)
      .set('access-token', token)
      .send(documents)
      .end((err, res) => dispatch(deleteDocumentsSuccess({documents: res.body})
      ));
  };
}

export function searchDocuments(title) {
  return (dispatch) => {
    getEndpoint(`/api/search/documents/?q=${title}`)
      .set('access-token', token)
      .end((err, res) => dispatch(searchDocumentsSuccess(res.body)
      ));
  };
}
