# Calendar builder/viewer

Every year I am asked to prepare custom calendar for our families. It features last year's photos of family member and their anniversaries. Originally, I was preparing everything in Adobe Photoshop and I liked the options, but it was time consuming. Intensely time consuming. I've decided to move some of the workload to browser and this is the result.

In order to avoid so much manual work, I've built this tool. Now I only need to specify data (what year it is, anniversaries, etc.) and provide pictures and the calendar gets build. :)

Every year I want to change the style a bit, so I baked support for different themes (which can be added as needed).

This app also provide better way to review the result.

## How to customize content

### Pictures
Images are stored in `public/img` folder. Then I recommend usind subfolder with year and inside folder for each calendar variation (if you want to print more calendars for different audience with different content). Then, I typically name pictures by the name of the month, e.g. `03.jpg` for March. Leading zero helps me see it nicely ordered. Pictures should already be prepared to fit, I didn't add any options to move photos etc.

### Data
For data I use JS object in `src/data/data.js`. Structure is as follows:
```js
year: 2021 // what year do we want
variants: [ // for each calendar one object in this array
    { // example of such an object
        id: 'name' // name of the variantion, usually name of recipient, needs to be same as folder with pictures
        title: 'Calendar title' // name of calendar, will be in dropdown menu 'Calendar for'
        cover: { // calendar cover settings
            cover: '00.jpg', // name of the cover image
            title: '', // gets outputed on calendar cover
            coverCaption: '' // optional caption of the photo
        },
        months: {
            month1: { // January
                cover: '01.jpg', // name of the image for this month
                coverCaption: '' // optional caption of the photo
                anniversaries: [ // array with bdays and namedays
                    {
                        day: 4,
                        name: 'Diana',
                        birtYear: '2020' // if specified, it means it is birthday, otherwise it is considered to be nameday
                    }
                ]
            }
        }
    }
]
```

Based on those data, calendar gets build. App provides quick and easy scaffolding. No need to manually write anniversaries anymore. :)

### Visuals
If you want to change visuals, you can either pick already existing theme, extend your own CSS or even refactor the code to your liking.

The code is semantic, so it can be manipulated quite a lot without having to edit markup. There is a `theme.scss` you can use to make a new theme.

## Export
Print final result to PDF and do whatever you like with it.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
