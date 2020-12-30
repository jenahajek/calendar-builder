import CoverImage from './CoverImage.js';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import startOfMonth from 'date-fns/startOfMonth';

const generateDates = (props, variant, month) => {
	const daysThisMonth = getDaysInMonth(new Date(props.year, month));
	const anniversaries = props.variants[variant].months[`month${month + 1}`].anniversaries
		? props.variants[variant].months[`month${month + 1}`].anniversaries
		: [];
	let content = [];
	for (let i = 1; i < daysThisMonth + 1; i++) {
		let anniversaryToday = false;
		anniversaries.some((anniversary) => {
			anniversaryToday = anniversary.day === i ? (anniversary.birthYear ? 'bday' : 'nameday') : false;
			return anniversaryToday;
		});
		content.push(
			<li key={i}>
				<div className="date">
					<time
						className={`day${anniversaryToday !== false ? ` day--${anniversaryToday}` : ''}`}
						dateTime={format(new Date(props.year, month, i), 'yyyy-MM-dd')}
					>
						{i}
					</time>
					<div className="anniversary">
						{anniversaries.map((anniversary) => {
							return anniversary.day === i ? (
								<p
									className={`${anniversary.birthYear ? 'bday' : 'nameday'}`}
									key={`${i}${anniversary.name}`}
								>
									{anniversary.name}{' '}
									{anniversary.birthYear ? <span>{props.year - anniversary.birthYear}</span> : ''}
								</p>
							) : (
								''
							);
						})}
					</div>
				</div>
			</li>
		);
	}
	return content;
};

const Month = ({ props, variant, month }) => {
	const imgPath = `./img/${props.year}/${props.variants[variant].id}/${
		props.variants[variant].months[`month${month + 1}`].cover
	}`;
	const imgCaption = `${props.variants[variant].months[`month${month + 1}`].coverCaption}`;
	const caption = imgCaption !== 'undefined' ? imgCaption : null;

	const firstDayOfMonth = startOfMonth(new Date(props.year, month));
	const positionOfFirstDayOfMonth = format(new Date(firstDayOfMonth), 'i');

	// const attribution = `<span>Photo by <a href="${
	// 	props.variants[variant].months[`month${month + 1}`].attribution.authorUrl
	// }">${props.variants[variant].months[`month${month + 1}`].attribution.authorName}</a> on <a href="${
	// 	props.variants[variant].months[`month${month + 1}`].attribution.sourceUrl
	// }">${props.variants[variant].months[`month${month + 1}`].attribution.sourceUrl}</a></span>`;

	return (
		<>
			<div className="calendar-sheet">
				<CoverImage imgPath={imgPath} caption={caption} />
				<div className="calendar-content">
					<h1 className="month">
						<span className="month__number">{month + 1}</span>
						<span className="month__name">
							{format(new Date(props.year, month), 'LLLL', { locale: cs })}
						</span>
					</h1>
					<div className="weekdays">
						<p className="weekdays__day">Mo</p>
						<p className="weekdays__day">Tu</p>
						<p className="weekdays__day">We</p>
						<p className="weekdays__day">Th</p>
						<p className="weekdays__day">Fr</p>
						<p className="weekdays__day">Sa</p>
						<p className="weekdays__day">Su</p>
					</div>
					<ul className={`dates dates--start-${positionOfFirstDayOfMonth}`}>
						{generateDates(props, variant, month)}
					</ul>
				</div>
			</div>
			{/* {attribution ? attribution : null} */}
		</>
	);
};

export default Month;
