import Icon from './Icon.js';

const Select = ({ label, className, icon, children }) => {
	return (
		<div className={`select ${className}`}>
			<label className="label">
				{icon ? <Icon className="mr-2">{icon}</Icon> : null}
				{label}
			</label>
			{children}
		</div>
	);
};

export default Select;
