//todo
//jQuery
//frameworks
//icon libraries
//animation libraries
//slickjs
//select2



const FRAMEWORKS = [
    {
        key: "bootstrap",
        name: "Bootstrap",
        value: "bootstrap"
    },
    {
        key: "flexboxgrid",
        name: "Flexbox Grid",
        value: "flexboxgrid"
    },
    {
        key: "tailwind",
        name: "Tailwind",
        value: "tailwind"
    }
];

const CSS_LIBS = [
    {
        key: "animationcss",
        name: "Animation.css",
        value: "animationcss"
    },
    {
        key: "fontawesome",
        name: "Font Awesome",
        value: "fontawesome"
    }
]

const JS_LIBS = [
    {
        key: "slickjs",
        name: "SlickJS",
        value: "slickjs"
    },
    {
        key: "select2",
        name: "Select2",
        value: "select2"
    }
];



const FILES_TO_COPY = [
    './src/js/index.js',
    './src/js/components/test.js',

    './src/scss/main.scss',
    './src/scss/components/test.scss',
];

exports.FRAMEWORKS = FRAMEWORKS;
exports.CSS_LIBS = CSS_LIBS;
exports.JS_LIBS = JS_LIBS;
exports.FILES_TO_COPY = FILES_TO_COPY;


