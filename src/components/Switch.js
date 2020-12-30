/* eslint-disable react-hooks/exhaustive-deps */ // todo ???
// TODO: navazat zvuk na zmenu stavu
// potrebuju:
// - aby vsechny switche meli stejny zvuk
// - aby reagovaly i na zmenu pri klavesove zkratce
// - aby nereagovaly naraz, nebo pri nacteni

import { useCallback } from 'react';
import SoundSwitchOn from '../sounds/ui_unlock.wav';
import SoundSwitchOff from '../sounds/ui_lock.wav';

const Switch = ({ id, state, onSwitchChange, className, children }) => {
	const toggleAudioOn = new Audio(SoundSwitchOn);
	const toggleAudioOff = new Audio(SoundSwitchOff);

	const playSound = (audioFile) => {
		audioFile.play();
	};

	const switchValue = useCallback(
		(value) => {
			value.target.ariaChecked === 'true' ? playSound(toggleAudioOff) : playSound(toggleAudioOn);
			onSwitchChange(value);
		},
		[onSwitchChange, toggleAudioOff, toggleAudioOn]
	);

	return (
		<div className={`switch ${className}`}>
			<label className="switch__label" htmlFor={id}>
				{children}
			</label>
			<button
				type="button"
				className="switch__button"
				role="switch"
				aria-checked={state}
				onClick={switchValue}
				id={id}
			>
				<span className="switch__handle">
					<span className="switch__circle"></span>
				</span>
			</button>
		</div>
	);
};

export default Switch;
