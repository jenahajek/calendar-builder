const Thumbnail = ({ props, variant, cover, isCoverActive, month, currentMonth, children }) => {
	return (
		<div className="thumbnail">
			<div className="thumbnail__inner">
				{cover ? (
					<>
						<span className={`thumbnail__hover ${isCoverActive ? 'is-active' : ''}`}>Cover</span>
						<img
							src={`./img/${props.year}/${props.variants[variant].id}/${props.variants[variant].cover.cover}`}
							alt=""
						/>
					</>
				) : (
					<>
						<span className={`thumbnail__hover ${currentMonth === month ? `is-active` : ''}`}>{`${
							month + 1
						}`}</span>
						<img
							src={`./img/${props.year}/${props.variants[variant].id}/${
								props.variants[variant].months[`month${month + 1}`].cover
							}`}
							alt=""
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Thumbnail;
