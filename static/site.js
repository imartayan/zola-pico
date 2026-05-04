/*!
 * Minimal theme switcher
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2022 - Licensed under MIT
 */

const themeSwitcher = {
    // Config
    _scheme: "auto",
    buttonTarget: "#theme-switcher",
    rootAttribute: "data-theme",
    localStorageKey: "picoPreferredColorScheme",

    // Get color scheme from local storage
    get schemeFromLocalStorage() {
        if (typeof window.localStorage !== "undefined") {
            if (window.localStorage.getItem(this.localStorageKey) !== null) {
                return window.localStorage.getItem(this.localStorageKey);
            }
        }
        return this._scheme;
    },

    // Store scheme to local storage
    schemeToLocalStorage() {
        if (typeof window.localStorage !== "undefined") {
            window.localStorage.setItem(this.localStorageKey, this.scheme);
        }
    },

    // Preferred color scheme
    get preferredColorScheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    },

    // Get scheme
    get scheme() {
        return this._scheme;
    },

    // Set scheme
    set scheme(scheme) {
        if (scheme == "auto") {
            this.preferredColorScheme == "dark"
                ? (this._scheme = "dark")
                : (this._scheme = "light");
        } else if (scheme == "dark" || scheme == "light") {
            this._scheme = scheme;
        }
        this.applyScheme();
        this.schemeToLocalStorage();
    },

    // Apply scheme
    applyScheme() {
        document
            .querySelector("html")
            .setAttribute(this.rootAttribute, this.scheme);
    },

    // Init
    init() {
        this.scheme = this.schemeFromLocalStorage;
        this.initSwitcher();
    },

    // Init switcher
    initSwitcher() {
        const switcher = document.querySelector(this.buttonTarget);
        switcher.addEventListener("click", event => {
            event.preventDefault();
            this.scheme = (this.scheme == "dark") ? "light" : "dark";
        }, false);
    },
};

// Init
themeSwitcher.init();
