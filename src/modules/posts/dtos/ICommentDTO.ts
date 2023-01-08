import Post from '../entities/Post';

export default interface ICommentDTO {
  comment: string;
  post_id: string;
  post?: Post;
}
