/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import Select from './Select.js';
import Icon from './Icon.js';
import Switch from './Switch.js';
import { ReactComponent as IconBleedMarks } from '../svg/cut.svg';
import { ReactComponent as IconPrint } from '../svg/print.svg';
import { ReactComponent as IconArrowRight } from '../svg/arrow-right.svg';
import { ReactComponent as IconArrowLeft } from '../svg/arrow-left.svg';
import { ReactComponent as IconPreviews } from '../svg/previews.svg';
import { ReactComponent as IconCaption } from '../svg/chat-bubble-outline.svg';
import { ReactComponent as IconFilmstrip } from '../svg/filmstrip.svg';
import { ReactComponent as IconWallpaper } from '../svg/wallpaper.svg';
import { ReactComponent as IconFace } from '../svg/face.svg';
import { ReactComponent as IconTheme } from '../svg/brush.svg';
import SoundPrev from '../sounds/navigation_backward-selection-minimal.wav';
import SoundNext from '../sounds/navigation_forward-selection-minimal.wav';
import SoundPick from '../sounds/ui_refresh-feed.wav';

const Controls = ({
	data,
	variant,
	onVariantChange,
	theme,
	onThemeChange,
	wallpaper,
	onWallpaperChange,
	preview,
	onPreviewChange,
	cover,
	onCoverChange,
	onPreviousMonthChange,
	onMonthChange,
	onNextMonthChange,
	bleedMarks,
	onBleedMarksChange,
	filmstrip,
	onFilmstripChange,
	imgCaption,
	onImgCaptionChange,
	month,
	onControlsChange,
	controls,
}) => {
	const pushButtonPrev = new Audio(SoundPrev);
	const pushButtonNext = new Audio(SoundNext);
	const selectSound = new Audio(SoundPick);
	const playSound = (audioFile) => {
		audioFile.play();
	};

	const showVariant = useCallback(
		(value) => {
			playSound(selectSound);
			onVariantChange(value);
		},
		[onVariantChange]
	);
	const showTheme = useCallback(
		(value) => {
			playSound(selectSound);
			onThemeChange(value);
		},
		[onThemeChange]
	);
	const pickWallpaper = useCallback(
		(value) => {
			playSound(selectSound);
			onWallpaperChange(value);
		},
		[onWallpaperChange]
	);
	const handlePreviewChange = useCallback(
		(event) => {
			onPreviewChange(event.target.value);
		},
		[onPreviewChange]
	);
	const handleCoverChange = useCallback(
		(event) => {
			playSound(pushButtonPrev);
			onCoverChange(event.target.value);
		},
		[onCoverChange, pushButtonPrev]
	);
	const showPreviousMonth = useCallback(
		(event) => {
			playSound(pushButtonPrev);
			onPreviousMonthChange(event.target.value);
		},
		[onPreviousMonthChange, pushButtonPrev]
	);
	const showNextMonth = useCallback(
		(event) => {
			playSound(pushButtonNext);
			onNextMonthChange(event.target.value);
		},
		[onNextMonthChange, pushButtonNext]
	);
	const handleBleedMarksChange = useCallback(
		(event) => {
			onBleedMarksChange(event.target.value);
		},
		[onBleedMarksChange]
	);
	const handleFilmstripChange = useCallback(
		(event) => {
			onFilmstripChange(event.target.value);
		},
		[onFilmstripChange]
	);
	const handleImgCaptionChange = useCallback(
		(event) => {
			onImgCaptionChange(event.target.value);
		},
		[onImgCaptionChange]
	);
	const handlePrint = () => {
		playSound(pushButtonNext);
		window.print();
	};
	const handleControlsChange = useCallback(
		(event) => {
			onControlsChange(event.target.value);
		},
		[onControlsChange]
	);

	return (
		<>
			<button className="controls-toggle" onClick={handleControlsChange}>
				<Icon className="controls-toggle__icon">{controls ? <IconArrowRight /> : <IconArrowLeft />}</Icon>
				<span className="u-vhide">{controls ? 'Close' : 'Open'} Menu</span>
			</button>
			<div className="controls">
				<h4 className="controls__title">Settings</h4>
				<Select label={`Calendar`} className="mb-2" icon={<IconFace />}>
					<select value={variant} onChange={(e) => showVariant(e.currentTarget.value)}>
						{data.variants.map((variant, i) => (
							<option key={i} value={i}>
								{variant.title}
							</option>
						))}
					</select>
				</Select>

				<Select label={`Theme`} className="mb-2" icon={<IconTheme />}>
					<select value={theme} onChange={(e) => showTheme(e.currentTarget.value)}>
						<option value="1">Default</option>
						<option value="2">Portrait</option>
						<option value="flamingo">Flamingo</option>
					</select>
				</Select>
				<Switch
					id="imgCaptions"
					onSwitchChange={handleImgCaptionChange}
					state={imgCaption}
					className="shortcut shortcut--c"
				>
					<Icon className="mr-2">
						<IconCaption />
					</Icon>
					{imgCaption ? 'Hide Photo Captions' : 'Show Photo Captions'}
				</Switch>

				<h4 className="controls__title mt-16">Display Options</h4>
				<Switch
					id="previews"
					onSwitchChange={handlePreviewChange}
					className="mb-4 shortcut shortcut--space"
					state={preview}
				>
					<Icon className="mr-2">
						<IconPreviews />
					</Icon>
					{preview ? 'Hide Previews' : 'Show Previews'}
				</Switch>
				<Switch
					id="filmstrip"
					onSwitchChange={handleFilmstripChange}
					state={filmstrip}
					className="mb-4 shortcut shortcut--f"
				>
					<Icon className="mr-2">
						<IconFilmstrip />
					</Icon>
					{filmstrip ? 'Hide Filmstrip' : 'Show Filmstrip'}
				</Switch>
				<Switch
					id="bleedMarks"
					onSwitchChange={handleBleedMarksChange}
					state={bleedMarks}
					className="mb-4 shortcut shortcut--b"
				>
					<Icon className="mr-2">
						<IconBleedMarks />
					</Icon>
					{bleedMarks ? 'Hide Bleed Marks' : 'Show Bleed Marks'}
				</Switch>

				<Select label={`Wallpaper`} icon={<IconWallpaper />}>
					<select value={wallpaper} onChange={(e) => pickWallpaper(e.currentTarget.value)}>
						<option value="0">White</option>
						<option value="1">Light Fabric</option>
						<option value="2">Double Bubble, Black</option>
						<option value="3">Moroccan Blossom (Navy Blue)</option>
						<option value="4">Leaves 1</option>
						<option value="5">Leaves 2</option>
					</select>
				</Select>

				<div className="controls__cta">
					<h4 className="controls__title mt-16">Controls &amp; Export</h4>
					<div className="btn-group">
						<button
							onClick={month === 0 ? handleCoverChange : showPreviousMonth}
							disabled={cover}
							className="btn shortcut shortcut--left"
						>
							<Icon>
								<IconArrowLeft />
							</Icon>
							{month <= 0 ? 'Cover' : 'Previous Month'}
						</button>

						<button
							onClick={showNextMonth}
							disabled={month === 11}
							className="btn btn--right shortcut shortcut--right"
						>
							Next Month
							<Icon>
								<IconArrowRight />
							</Icon>
						</button>
					</div>
					<div className="btn-group">
						<button onClick={handlePrint} className="btn shortcut shortcut--p">
							<Icon>
								<IconPrint />
							</Icon>
							Print to PDF
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Controls;
