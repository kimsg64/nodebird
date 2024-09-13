export default interface IPost {
    id: number;
    User: {
        id: number;
        nickname: string;
    };
    content: string;
    Images: {
        src: string;
    }[];
    Comments: {
        User: { nickname: string; id: number };
        content: string;
    }[];
    Likers: { id: string }[];
    RetweetId: number;
    Retweet: IPost;
    createdAt: Date;
}
