import { BrowserWindow, Tray, TouchBar } from "electron";
import { initTouchBar } from "../touch-bar";
import { initTray } from "../trays/tray";
import { initAppMenu } from "../menu";
import { initLrcTray } from "../trays/lrc-tray";
import { registerShortcut } from "../global-shortcut";

export class MainWindow {
    private static instance: BrowserWindow;
    private static tray: Tray;
    private static touchBar: TouchBar;
    private static lrcTray: Tray;

    private constructor() {
    }

    public static getTray() {
        return this.tray;
    }

    public static getTouchBar() {
        return this.touchBar;
    }

    public static getLrcTray() {
        return this.lrcTray;
    }

    public static create(): MainWindow {
        return this.instance = this.createWindow();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = this.createWindow();
        } else {
            return this.instance;
        }
    }

    public static isInitialized() {
        return !!this.instance;
    }

    private static createWindow(): BrowserWindow {
        // Create the browser window.
        const mainWindow = new BrowserWindow({
            width: 1000,
            height: 670,
            minHeight: 670,
            maxHeight: 670,
            minWidth: 1000,
            maxWidth: 1000,
            center: true,
            titleBarStyle: 'hiddenInset',
            // transparent: true,
            // backgroundColor: '#00FFFFFF',
            webPreferences: {
                webSecurity: false,
                preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            }
        });

        // and load the index.html of the app.
        mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

        // Open the DevTools.
        // mainWindow.webContents.openDevTools();

        // mainWindow.webContents.clearHistory();
        // mainWindow.webContents.on('did-finish-load', () => {
        //     mainWindow.webContents.clearHistory();
        // });

        // Emitted when the window is closed.
        mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.instance = null;
        });

        mainWindow.on('close', e => {
            if (mainWindow.webContents.isFocused() && mainWindow.isVisible()) {
                e.preventDefault();
                mainWindow.hide();
            }
        });

        this.touchBar = initTouchBar(mainWindow);
        this.tray = initTray(mainWindow);
        this.lrcTray = initLrcTray(mainWindow);
        registerShortcut(mainWindow);
        initAppMenu(mainWindow);

        return mainWindow;
    }
}
