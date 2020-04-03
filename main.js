const path = require('path');
const http = require('http');

const {app, BrowserWindow, ipcMain} = require('electron');

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        resizable: false
    });

    // and load the index.html of the app.
    win.loadFile('index.html');
    win.setMenu(null);
}

app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});

let server;

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('start-server', async (event, data) => {
    if (server) {
        server.close();
    }

    const paths = data.paths || [];
    process.env['MEDIAS_DIRECTORIES'] = paths.reduce((prev, path) => prev === '' ? path : `${prev}:${path}`, '');

    const api = require('./server');
    api.set('port', data.port);
    server = http.createServer(api);

    server.listen(data.port, () => {
        console.log('server start in port:', data.port);
    });
});

ipcMain.on('stop-server', async () => {
    if (server) {
        server.close();
        console.log('server stopped');
    }
});
