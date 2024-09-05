import { useCallback, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import ImagesZoom from './ImagesZoom';

type Props = {
    images: { src: string }[];
};

const PostImages = ({ images }: Props) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => setShowImagesZoom(true), []);
    const onClose = useCallback(() => setShowImagesZoom(false), []);

    if (images.length === 1) {
        return (
            <>
                <img
                    role="presentaion"
                    style={{ width: '50%', display: 'inline-block' }}
                    src={`http://localhost:3065/${images[0].src}`}
                    alt={images[0].src}
                    onClick={onZoom}
                />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        );
    }
    if (images.length === 2) {
        return (
            <>
                <img
                    role="presentaion"
                    style={{ width: '50%', display: 'inline-block' }}
                    src={`http://localhost:3065/${images[0].src}`}
                    alt={images[0].src}
                    onClick={onZoom}
                />
                <img
                    role="presentaion"
                    style={{ width: '50%', display: 'inline-block' }}
                    src={`http://localhost:3065/${images[1].src}`}
                    alt={images[1].src}
                    onClick={onZoom}
                />
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        );
    }

    return (
        <>
            <img
                role="presentaion"
                style={{ width: '50%', display: 'inline-block' }}
                src={`http://localhost:3065/${images[0].src}`}
                alt={images[0].src}
                onClick={onZoom}
            />
            <div
                role="presentaion"
                style={{ width: '50%', display: 'inline-block', textAlign: 'center', verticalAlign: 'middle' }}
                onClick={onZoom}
            >
                <PlusOutlined />
                <br />
                {images.length - 1}개의 사진 더보기
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
        </>
    );
};

export default PostImages;
