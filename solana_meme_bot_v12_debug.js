// ==UserScript==
// @name         Solana Meme Coin Trading Bot Debug Version
// @namespace    http://tampermonkey.net/
// @version      12.1
// @description  Debug version of the bot with working buy function and optional debugging logs.
// @author       camninja1315-cell & Copilot
// @match        https://photon-sol.tinyastro.io/en/lp/*
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    const CONFIG = {
        BOT_VERSION: "12.1 - Debug Version",
        PAPER_TRADING_MODE: true,
        REAL_TRADE_AMOUNT_SOL: 0.01,
        CHECK_INTERVAL_MS: 2500,
        ENABLE_DEBUG_LOGS: true, // Set to false to disable debugging logs
    };

    // --- State ---
    let tradeState = { inTrade: false };

    // --- Utility Functions ---
    async function waitForElement(selector, timeout = 5000) {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const el = document.querySelector(selector);
            if (el) return el;
            await new Promise(res => setTimeout(res, 100));
        }
        return null;
    }

    function debugLog(message) {
        if (CONFIG.ENABLE_DEBUG_LOGS) {
            console.log(`[DEBUG] ${message}`);
        }
    }

    // --- Buy Function ---
    async function handleRealBuy() {
        debugLog("Attempting to buy...");

        // Find the first "Buy" preset button
        const firstBuyPresetButton = document.querySelector('.js-fpf__button[data-type="buy"][data-preset="0"]');

        if (firstBuyPresetButton) {
            debugLog("Found the first 'Buy' preset button. Clicking it...");
            firstBuyPresetButton.click();
            debugLog("Buy order submitted.");
            return true;
        } else {
            console.error("Could not find the first 'Buy' preset button.");
            return false;
        }
    }

    // --- Main Logic ---
    function main() {
        debugLog("Running main loop...");

        if (tradeState.inTrade) {
            debugLog("Already in a trade. Skipping this cycle.");
            return;
        }

        // Placeholder for market data analysis and trade decision
        debugLog("Analyzing market data...");
        const shouldBuy = true; // Replace with real condition

        if (shouldBuy) {
            debugLog("Trade conditions met. Initiating buy...");
            handleRealBuy().then(success => {
                if (success) {
                    tradeState.inTrade = true;
                    debugLog("Trade entered successfully.");
                } else {
                    debugLog("Trade entry failed.");
                }
            });
        }
    }

    // --- Initialization ---
    function initialize() {
        console.log(`[INIT] Bot v${CONFIG.BOT_VERSION} initializing...`);
        setInterval(main, CONFIG.CHECK_INTERVAL_MS);
    }

    setTimeout(initialize, 3000);
})();