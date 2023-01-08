import Post from '../entities/Post';

export default interface IReactionDTO {
  reaction: string;
  post_id: string;
  post?: Post;
}
