if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then((registration) => {
    // Registration was successful
    console.log('FitSelf ServiceWorker registration successful with scope: ', registration.scope);
  }).catch((err) => {
  // registration failed
    console.log('FitSelf ServiceWorker registration failed: ', err);
  });
}
