class KeyWatcher {
    #pressedKeys = {};
    constructor() {

    }

    isKeyPressed(name) {
        return this.#pressedKeys[name] === true; // Filters "undefinded" too;
    }

    initListeners() {
        window.addEventListener("keyup", (e) => {
            this.#pressedKeys[e.key] = false;
        });

        window.addEventListener("keydown", (e) => {
            this.#pressedKeys[e.key] = true;
        });
    }
}

var keyWatcher = new KeyWatcher();
keyWatcher.initListeners();