import { useState } from "react";

import Slick from "react-slick";
import { Overlay, Header, CloseBtn, SlickWrapper, ImageWrapper, Indicator, Global } from "./styles";

type Props = { images: { src: string }[]; onClose: () => void };

const ImagesZoom = ({ images, onClose }: Props) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<Overlay>
			<Global />
			<Header>
				<h1>상세 이미지</h1>
				<CloseBtn onClick={onClose}>X</CloseBtn>
			</Header>
			<SlickWrapper>
				<div>
					<Slick initialSlide={0} beforeChange={(slide: number) => setCurrentSlide(slide)} infinite arrows={false} slidesToShow={1} slidesToScroll={1}>
						{images.map((image) => (
							<ImageWrapper key={image.src}>
								<img src={image.src} alt={image.src} />
							</ImageWrapper>
						))}
					</Slick>
					<Indicator>
						<div>
							{currentSlide + 1} / {images.length}
						</div>
					</Indicator>
				</div>
			</SlickWrapper>
		</Overlay>
	);
};
export default ImagesZoom;
