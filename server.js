const path = require('path');
const express = require('express');
const routes = require('./controllers');
const hbs = require('express-handlebars').create({});
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'thisismysecret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ exteneded: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on: ' + PORT + '!'));
});
