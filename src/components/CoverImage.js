const CoverImage = ({ imgPath, caption }) => {
	return (
		<div className="cover-image">
			<figure>
				<img src={imgPath} alt="" />
				{caption !== null ? <figcaption className="cover-image__caption">{caption}</figcaption> : ''}
			</figure>
		</div>
	);
};

export default CoverImage;
