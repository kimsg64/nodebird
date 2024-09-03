import Link from "next/link";

type Props = { postData: string };
const PostCardContent = ({ postData }: Props) => {
	return (
		<div>
			{postData.split(/(#[^\s#]+)/g).map((v, i) => {
				if (v.match(/(#[^\s#]+)/)) {
					return (
						<Link key={i} href={`/hashtag/${v.slice(1)}`}>
							{v}
						</Link>
					);
				}
				return v;
			})}
		</div>
	);
};

export default PostCardContent;
