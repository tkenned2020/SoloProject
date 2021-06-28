import { csrfFetch } from './csrf'

//actions
const AddComment = 'images/AddComment'
const LoadComments = 'images/LoadComments'
const ModifyComment = 'images/ModifyComment'
const DestroyComment = 'images/DestroyComment'

//action creators
const addComment = (comment) => (
  {type: AddComment, comment}
);

const loadComments = (comments) => (
  {type: LoadComments, comments}
);

const modifiedComment = (comment) => (
  {type: ModifyComment, comment}
);

const destroyComment = (comment) => (
  {type: DestroyComment, comment}
);

//thunks
export const setComments = (imageId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${imageId}`)
  if (res.ok) {
      const comments = await res.json()
      dispatch(loadComments(comments))
  }
};

export const modifyComment = (textfield, commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({textfield})
  })
  if (res.ok) {
      const modifyComment = await res.json()
      dispatch(modifiedComment(modifyComment))
  }
};

export const createComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.imageId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
  })
  if (res.ok) {
      const createComment = await res.json()
      dispatch(addComment(createComment))
  }
};

export const destroyedComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
  })
  if (res.ok) {
      dispatch(destroyComment(commentId))
  }
};

//reducer
export default function commentsReducer (state = {}, action) {
  let newState;
  switch (action.type) {
      case LoadComments: {
          newState = {}
          action.comments.forEach(comment => {
              newState[comment.id] = comment
          });
          // newState.comments2 = [...action.comments]
          return newState
        }
        case AddComment: {
          newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case ModifyComment: {
          newState = {...state}
            newState[action.comment.id] = action.comment
            return newState
        }
        case DestroyComment: {
          newState = {...state}
            delete newState[action.comment]
            return newState
          // newState = {...state, comment:action.comment}
          //   return newState
        }
        default:
            return state
    }
  };
