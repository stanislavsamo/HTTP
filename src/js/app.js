import HelpDesk from './HelpDesk';

const root = document.getElementById('root');
const url = 'http://localhost:7070';

const app = new HelpDesk(root, url);

app.init();
