import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Root from "./components/Root";
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();

let deferredPrompt;
const alertDownload = document.querySelector('.alertDownload');
alertDownload.style.display = 'none';
alertDownload.style.position = 'fixed';
alertDownload.style.top = '0';
alertDownload.style.width = '100%';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    alertDownload.style.display = 'block';

    alertDownload.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        alertDownload.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});