import { useHistory } from "react-router-dom"

let history = useHistory();

const removeComment (commentId) {
    return {
        type: commentId
    }
}


const editComment (commentId, textfield) {
    return {
        commentId,
        textfield,
    }
}

const updateComment = async (commentId, textfield, e) =>{
    e.preventDefault();
    await dispatch(editComment(textfield, commentId));
    setBody("");
    setShowForm(false)

}

const openForm = (comment) => {
    setShowForm(true);
    setBody(comment.textfield);
    setFormId(comment.id)
};

if (!user) history.push("/");
