import { useState } from 'react';
import { HotKeys } from 'react-hotkeys';
import './styles/App.scss';
import { DATA } from './data/data.js';
import Page from './components/Page.js';
import Controls from './components/Controls.js';
import Thumbnail from './components/Thumbnail.js';
import { Helmet } from 'react-helmet';
import SoundNext from './sounds/navigation_forward-selection-minimal.wav';
import SoundOpen from './sounds/state-change_confirm-up.wav';
import SoundClose from './sounds/state-change_confirm-down.wav';

function App() {
	const pickSound = new Audio(SoundNext);
	const openSound = new Audio(SoundOpen);
	const closeSound = new Audio(SoundClose);
	const playSound = (audioFile) => {
		audioFile.play();
	};

	const [variant, setVariant] = useState(0);
	const [theme, setTheme] = useState(1);
	const [wallpaper, setWallpaper] = useState(1);
	const [preview, setPreview] = useState(false);
	const [cover, setCover] = useState(false);
	const [month, setMonth] = useState(0);
	const [bleedMarks, setBleedMarks] = useState(false);
	const [filmstrip, setFilmstrip] = useState(false);
	const [imgCaption, setImgCaption] = useState(false);
	const [controls, setControls] = useState(true);

	const showVariant = (variant) => {
		setVariant(variant);
	};
	const showTheme = (theme) => {
		setTheme(theme);
	};
	const pickWallpaper = (wallpaper) => {
		setWallpaper(wallpaper);
	};
	const togglePreview = () => {
		setPreview(!preview);
	};
	const toggleCover = () => {
		setCover(true);
		playSound(pickSound);
		setMonth(-1);
		setPreview(false);
	};
	const nextMonth = () => {
		setMonth(month + 1);
		setCover(false);
		setPreview(false);
	};
	const showMonth = (month) => {
		playSound(pickSound);
		setMonth(month);
		setCover(false);
		setPreview(false);
	};
	const previousMonth = () => {
		setMonth(month - 1);
		setCover(false);
		setPreview(false);
	};
	const toggleBleedMarks = () => {
		setBleedMarks(!bleedMarks);
	};
	const toggleFilmstrip = () => {
		setFilmstrip(!filmstrip);
	};
	const toggleImgCaption = () => {
		setImgCaption(!imgCaption);
	};
	const toggleControls = () => {
		setControls(!controls);
		controls ? playSound(closeSound) : playSound(openSound);
	};

	const generatePreviews = () => {
		let content = [];
		for (let i = 0; i < 12; i++) {
			content.push(
				<button className="preview" onClick={() => showMonth(i)} key={i}>
					<Page data={DATA} theme={theme} bleedMarks={false} variant={variant} cover={false} month={i}></Page>
				</button>
			);
		}
		return content;
	};
	const generateThumbnails = () => {
		let content = [];
		for (let i = 0; i < 12; i++) {
			content.push(
				<button className="filmstrip__thumbnail" onClick={() => showMonth(i)} key={i}>
					<Thumbnail props={DATA} theme={theme} variant={variant} month={i} currentMonth={month}></Thumbnail>
				</button>
			);
		}
		return content;
	};

	// keyboard nav
	const keyMap = {
		TOGGLE_CAPTIONS: 'c',
		TOGGLE_PREVIEW: 'space',
		TOGGLE_FILMSTRIP: 'f',
		PREV: 'left',
		NEXT: 'right',
		TOGGLE_BLEED: 'b',
		PRINT: 'p',
		TOGGLE_CONTROLS: 'esc',
	};

	const handlers = {
		TOGGLE_CAPTIONS: (event) => toggleImgCaption(),
		TOGGLE_FILMSTRIP: (event) => toggleFilmstrip(),
		TOGGLE_PREVIEW: (event) => togglePreview(),
		PREV: () => (month === 0 ? toggleCover() : previousMonth()),
		NEXT: () => nextMonth(),
		TOGGLE_BLEED: () => toggleBleedMarks(),
		TOGGLE_CONTROLS: () => toggleControls(),
		PRINT: () => window.print(),
	};

	return (
		<HotKeys keyMap={keyMap} handlers={handlers} root>
			<div
				className={`app theme-${theme} ${bleedMarks ? 'bleed-marks-on' : 'bleed-marks-off'} ${
					filmstrip ? 'filmstrip-on' : 'filmstrip-off'
				} ${imgCaption ? 'img-caption-on' : 'img-caption-off'} wall wall--${wallpaper} ${
					preview ? 'previews-on' : 'previews-off'
				} ${controls ? 'controls-on' : 'controls-off'}`}
			>
				<Controls
					data={DATA}
					variant={variant}
					onVariantChange={showVariant}
					theme={theme}
					onThemeChange={showTheme}
					wallpaper={wallpaper}
					onWallpaperChange={pickWallpaper}
					preview={preview}
					onPreviewChange={togglePreview}
					cover={cover}
					onCoverChange={toggleCover}
					onPreviousMonthChange={previousMonth}
					onMonthChange={showMonth}
					onNextMonthChange={nextMonth}
					bleedMarks={bleedMarks}
					onBleedMarksChange={toggleBleedMarks}
					filmstrip={filmstrip}
					onFilmstripChange={toggleFilmstrip}
					imgCaption={imgCaption}
					onImgCaptionChange={toggleImgCaption}
					month={month}
					onControlsChange={toggleControls}
					controls={controls}
				/>
				<div className="app__content">
					<div className="previews">{generatePreviews()}</div>
					<div className="filmstrip">
						<button className="filmstrip__thumbnail" onClick={() => toggleCover()} key="cover">
							<Thumbnail
								props={DATA}
								theme={theme}
								variant={variant}
								cover={true}
								isCoverActive={cover}
							></Thumbnail>
						</button>
						{generateThumbnails()}
					</div>

					<Page
						data={DATA}
						theme={theme}
						bleedMarks={bleedMarks}
						variant={variant}
						cover={cover}
						month={month}
					>
						<Helmet>
							<title>{`${month < 9 ? '0' : ''}${month + 1}`}</title>
						</Helmet>
					</Page>
				</div>
			</div>
		</HotKeys>
	);
}

export default App;
