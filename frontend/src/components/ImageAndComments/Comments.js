import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import { setComments, createComment, modifyComment, destroyedComment} from '../../store/comments';
// import PhotoCard from './PhotoCard';
import './Comments.css';

export default function Comments() {
    const [formId, setFormId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [textfield, setTextfield] = useState('')
    const [newComment, setNewComment] = useState('')

    const comments = useSelector(state => state.comments)
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const {imageId} = useParams()

    useEffect(() => {
        dispatch(setComments(imageId))
    }, [dispatch, imageId]);

    const userComment = async e => {
        e.preventDefault()
        dispatch(createComment({
            textfield: newComment,
            userId: user.id,
            imageId
        }))
        setNewComment('')
    };

    const modifiedComment = async (e, commentId, textfield ) => {
        e.preventDefault()
        await dispatch(modifyComment(textfield, commentId))
        setTextfield('')
        setShowForm(false)
    };

    const destroyComment = (commentId) => {
        let alert = window.confirm('Haki?')
        if (alert) {
            dispatch(destroyedComment(commentId))

            history.push(`/comment/${imageId}`)
        }
    };

    const popupForm = (comment) => {
        setShowForm(true)
        setTextfield(comment.textfield)
        setFormId(comment.id)
    };

    if (!user) history.push('/');

return (
    <div>
        {comments &&
        Object.values(comments)?.map(comment => {
            return (
                <div key={comment.id} className='commentsContainer'>
                    <div>
                        <div>
                            <p>{comment.User?.userName}</p>
                            <p>{comment.textfield}</p>
                            {user.id === comment.userId && (
                                <div>
                                    <div className='modifyBtnContainer'>
                                    <button className='modifyBtn' onClick={() => popupForm(comment)}>Modify Comment</button>
                                    </div>
                                    {showForm && comment.id === formId ?
                                        <form onSubmit={ e => modifiedComment(e, comment.id, textfield)} key={comment.id}>
                                            <input type="text" value={textfield} onChange={(e) => setTextfield(e.target.value)} />
                                            <button className='modifyComment' type='submit' onSubmit={(e) => modifyComment( e, comment.id, textfield)}>modify</button>
                                            <button className='destroyComment' onClick={() => destroyComment(comment.id)}>destroy</button>
                                        </form>
                                        : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        })}
        <div>
            <form onSubmit={userComment}>
                <textarea className='textArea' value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="50" rows="50"></textarea>
                <div>
                    <button className='submitBtn' type='submit'>Submit</button>

                </div>
            </form>
        </div>
    </div>
    )
}
