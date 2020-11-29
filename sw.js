//install process
self.addEventListener('install', (e) => {
    console.log('sw is installed');
})

//activate process
self.addEventListener('activate', (e) => {
    console.log('sw is activated');
})

//fecth events
self.addEventListener('fetch', (e) => {
    console.log('fetch event',e);
})
