/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

/* eslint-disable import/no-unresolved */
import confetti from 'canvas-confetti';
/* eslint-enable import/no-unresolved */

confetti.create(document.getElementById('canvas'), {
  resize: true,
  useWorker: true,
})({ particleCount: 100, spread: 160 });
