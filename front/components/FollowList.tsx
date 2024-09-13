import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { useDispatch } from 'react-redux';

type Props = {
    header: string;
    data: { nickname: string; id: number }[];
    onClickMore: () => {};
    loading: boolean;
};

const FollowList = ({ header, data, onClickMore, loading }: Props) => {
    const dispatch = useDispatch();

    const onCancel = (id) => () => {
        if (header === '팔로일') {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: id,
            });
        } else {
            dispatch({
                type: REMOVE_FOLLOWER_REQUEST,
                data: id,
            });
        }
    };
    return (
        <List
            style={{ marginBottom: 20 }}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="small"
            header={<div>{header}</div>}
            loadMore={
                <div style={{ textAlign: 'center', margin: '10px 0' }}>
                    <Button onClick={onClickMore} loading={loading}>
                        더 보기
                    </Button>
                </div>
            }
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default FollowList;
