import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Link from 'next/link';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';

type Props = {
    postData: string;
    editMode: boolean;
    onChangePost: (text: string) => MouseEventHandler;
    onCancelUpdatePost: () => void;
};
const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdatePost }: Props) => {
    const [editText, setEditText] = useState(postData);
    const { updatePostLoading, updatePostDone } = useSelector((state: RootState) => state.post);
    useEffect(() => {
        if (updatePostDone) {
            onCancelUpdatePost();
        }
    }, [updatePostDone]);
    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    }, []);

    return (
        <div>
            {editMode ? (
                <>
                    <TextArea value={editText} onChange={onChangeText} />
                    <Button.Group>
                        <Button onClick={onChangePost(editText)} loading={updatePostLoading}>
                            수정
                        </Button>
                        <Button onClick={onCancelUpdatePost}>취소</Button>
                    </Button.Group>
                </>
            ) : (
                postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if (v.match(/(#[^\s#]+)/)) {
                        return (
                            <Link href={`/hashtag/${v.slice(1)}`} key={i} prefetch={false}>
                                {v}
                            </Link>
                        );
                    }
                    return v;
                })
            )}
        </div>
    );
};

export default PostCardContent;
