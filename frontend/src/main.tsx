import { render } from '@solidjs/web';
import { App } from './App';
import './app.css';

const root = document.getElementById('root');
if (!root) throw new Error('The application root is missing.');

render(() => <App />, root);
