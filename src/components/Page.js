import Month from './Month.js';
import Cover from './Cover.js';
import BleedMarks from './BleedMarks.js';

const Page = ({ data, theme, bleedMarks, variant, cover, month, children }) => {
	const attributionObj = cover
		? data.variants[variant].cover.attribution
		: data.variants[variant].months[`month${month + 1}`].attribution;

	return (
		<>
			<div className="page__wrapper">
				{children}
				<div className="page">
					{cover ? (
						<Cover props={data} variant={variant} />
					) : (
						<Month props={data} variant={variant} month={month} />
					)}
				</div>
				<BleedMarks />
				{attributionObj !== undefined ? (
					<p class="attribution">
						Photo by{' '}
						<a href={`${attributionObj.authorUrl}`} target="_blank" rel="noreferrer noopener">
							{attributionObj.authorName}
						</a>{' '}
						on{' '}
						<a href={`${attributionObj.sourceUrl}`} target="_blank" rel="noreferrer noopener">
							{attributionObj.sourceName}
						</a>
						. Thank you!
					</p>
				) : null}
			</div>
		</>
	);
};

export default Page;
