import CoverImage from './CoverImage.js';

const Cover = ({ props, variant }) => {
	const actualVariant = props.variants[variant];
	const imgPath = `./img/${props.year}/${actualVariant.id}/${actualVariant.cover.cover}`;

	const imgCaption = `${props.variants[variant].cover.coverCaption}`;
	const caption = imgCaption !== 'undefined' ? imgCaption : null;

	return (
		<div className="cover">
			<CoverImage imgPath={imgPath} caption={caption} />
			<h1 className="cover__title">
				{actualVariant.cover.title} <span className="cover__year">{props.year}</span>
			</h1>
		</div>
	);
};

export default Cover;
