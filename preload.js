const {ipcRenderer} = require('electron');

const _setImmediate = setImmediate;
const _clearImmediate = clearImmediate;

process.once('loaded', () => {
    global.setImmediate = _setImmediate;
    global.clearImmediate = _clearImmediate;

    window.addEventListener('message', evt => {
        if (evt.data.type === 'start-server') {
            ipcRenderer.send('start-server', evt.data);
        }
    })
});
