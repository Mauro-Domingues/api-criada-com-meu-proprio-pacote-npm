import { Router } from 'express';

import CreatePostController from '@modules/posts/services/createPost/CreatePostController';
import ShowPostController from '@modules/posts/services/showPost/ShowPostController';
import ListPostController from '@modules/posts/services/listPost/ListPostController';
import UpdatePostController from '@modules/posts/services/updatePost/UpdatePostController';
import DeletePostController from '@modules/posts/services/deletePost/DeletePostController';
import CreateCommentController from '@modules/posts/services/createComment/CreateCommentController';
import ShowCommentController from '@modules/posts/services/showComment/ShowCommentController';
import ListCommentController from '@modules/posts/services/listComment/ListCommentController';
import UpdateCommentController from '@modules/posts/services/updateComment/UpdateCommentController';
import DeleteCommentController from '@modules/posts/services/deleteComment/DeleteCommentController';
import CreateReactionController from '@modules/posts/services/createReaction/CreateReactionController';
import ShowReactionController from '@modules/posts/services/showReaction/ShowReactionController';
import ListReactionController from '@modules/posts/services/listReaction/ListReactionController';
import UpdateReactionController from '@modules/posts/services/updateReaction/UpdateReactionController';
import DeleteReactionController from '@modules/posts/services/deleteReaction/DeleteReactionController';

const postRouter = Router();
const createPostController = new CreatePostController();
const listPostController = new ListPostController();
const showPostController = new ShowPostController();
const updatePostController = new UpdatePostController();
const deletePostController = new DeletePostController();

postRouter.post('/', createPostController.handle);
postRouter.get('/', listPostController.handle);
postRouter.get('/:id', showPostController.handle);
postRouter.put('/:id', updatePostController.handle);
postRouter.delete('/:id', deletePostController.handle);

const createCommentController = new CreateCommentController();
const listCommentController = new ListCommentController();
const showCommentController = new ShowCommentController();
const updateCommentController = new UpdateCommentController();
const deleteCommentController = new DeleteCommentController();

postRouter.post('/:id/track/comments', createCommentController.handle);
postRouter.get('/track/comments', listCommentController.handle);
postRouter.get('/track/comments/:id', showCommentController.handle);
postRouter.put('/track/comments/:id', updateCommentController.handle);
postRouter.delete('/track/comments/:id', deleteCommentController.handle);

const createReactionController = new CreateReactionController();
const listReactionController = new ListReactionController();
const showReactionController = new ShowReactionController();
const updateReactionController = new UpdateReactionController();
const deleteReactionController = new DeleteReactionController();

postRouter.post('/:id/track/reactions', createReactionController.handle);
postRouter.get('/track/reactions', listReactionController.handle);
postRouter.get('/track/reactions/:id', showReactionController.handle);
postRouter.put('/track/reactions/:id', updateReactionController.handle);
postRouter.delete('/track/reactions/:id', deleteReactionController.handle);

export default postRouter;
