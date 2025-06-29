var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// ==UserScript==
// @name         Gemini Copy Export
// @namespace    https://github.com/simplespace-cat/userscripts
// @version      2.5
// @description  Scroll to the top of the page → Click the button
// @homepageURL https://github.com/simplespace-cat/Gemini-Export
// @author       @simplespace-cat
// @license      Apache License Version 2.0
// @icon https://www.google.com/s2/favicons?sz=64&domain=gemini.google.com
// @match        https://gemini.google.com/app/*
// @match        https://gemini.google.com/app
// @run-at       document-end
// @grant        none
// @downloadURL https://raw.githubusercontent.com/simplespace-cat/Gemini-Export/main/copy/Gemini-export.user.js
// @updateURL   https://raw.githubusercontent.com/simplespace-cat/Gemini-Export/main/copy/Gemini-export.user.js
// ==/UserScript==
function logger(osrc_nachricht, osrc_stufe) {
    if (osrc_stufe === void 0) { osrc_stufe = 'log'; }
    var osrc_zeitstempel = new Date().toISOString();
    console[osrc_stufe]("[GeminiExport ".concat(osrc_zeitstempel, "] ").concat(osrc_nachricht));
}
(function mainEntry() {
    logger('Script started');
    createCopyButton();
})();
/**
 * Helper function: Inject CSS styles.
 * @param css The CSS rules string to inject.
 */
function injectCss(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}
/**
 * Core function: Create the copy button (using createElementNS).
 * This version safely builds the DOM programmatically, bypassing Trusted Types restrictions.
 */
function createCopyButton() {
    var css = "\n        #gemini-export-final-button {\n            position: fixed;\n            top: 50%;\n            right: 20px;\n            transform: translateY(-50%);\n            width: 50px;\n            height: 50px;\n            border-radius: 50%;\n            background-color: #ffffff; /* White background to display the SVG gradient */\n            border: none;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            cursor: pointer;\n            z-index: 99999;\n            transition: all 0.2s ease;\n            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Add shadow for a layered look */\n        }\n        #gemini-export-final-button:hover {\n            transform: translateY(-50%) scale(1.05);\n            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n        }\n        #gemini-export-final-button svg {\n            width: 28px;\n            height: 28px;\n        }\n    ";
    injectCss(css);
    var button = document.createElement('button');
    button.id = 'gemini-export-final-button';
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '28');
    svg.setAttribute('height', '28');
    svg.setAttribute('viewBox', '0 0 28 28');
    svg.setAttribute('fill', 'none');
    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var radialGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    radialGradient.setAttribute('id', 'paint0_radial_16771_53212');
    radialGradient.setAttribute('cx', '0');
    radialGradient.setAttribute('cy', '0');
    radialGradient.setAttribute('r', '1');
    radialGradient.setAttribute('gradientUnits', 'userSpaceOnUse');
    radialGradient.setAttribute('gradientTransform', 'translate(2.77876 11.3795) rotate(18.6832) scale(29.8025 238.737)');
    var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0.0671246');
    stop1.setAttribute('stop-color', '#9168C0');
    var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '0.342551');
    stop2.setAttribute('stop-color', '#5684D1');
    var stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '0.672076');
    stop3.setAttribute('stop-color', '#1BA1E3');
    radialGradient.appendChild(stop1);
    radialGradient.appendChild(stop2);
    radialGradient.appendChild(stop3);
    defs.appendChild(radialGradient);
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M14 28C14 26.0633 13.6267 24.2433 12.88 22.54C12.1567 20.8367 11.165 19.355 9.905 18.095C8.645 16.835 7.16333 15.8433 5.46 15.12C3.75667 14.3733 1.93667 14 0 14C1.93667 14 3.75667 13.6383 5.46 12.915C7.16333 12.1683 8.645 11.165 9.905 9.905C11.165 8.645 12.1567 7.16333 12.88 5.46C13.6267 3.75667 14 1.93667 14 0C14 1.93667 14.3617 3.75667 15.085 5.46C15.8317 7.16333 16.835 8.645 18.095 9.905C19.355 11.165 20.8367 12.1683 22.54 12.915C24.2433 13.6383 26.0633 14 28 14C26.0633 14 24.2433 14.3733 22.54 15.12C20.8367 15.8433 19.355 16.835 18.095 18.095C16.835 19.355 15.8317 20.8367 15.085 22.54C14.3617 24.2433 14 26.0633 14 28Z');
    path.setAttribute('fill', 'url(#paint0_radial_16771_53212)');
    svg.appendChild(defs);
    svg.appendChild(path);
    button.appendChild(svg);
    initDragLogic(button);
    document.body.appendChild(button);
}
/**
 * General prompt function - solves vertical layout issues.
 */
function createGeneralPrompt(btn, text, color) {
    var msg = document.createElement('div');
    msg.textContent = text;
    var rect = btn.getBoundingClientRect();
    msg.style.cssText = "\n        position: fixed;\n        top: ".concat(rect.bottom + 10, "px;\n        left: ").concat(rect.left + rect.width / 2, "px;\n        transform: translateX(-50%);\n        background-color: ").concat(color, ";\n        color: #fff;\n        padding: 5px 10px;\n        border-radius: 5px;\n        z-index: 1000;\n        \n        /* Fix for vertical layout and font */\n        writing-mode: horizontal-tb !important;\n        text-orientation: mixed !important;\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;\n        font-size: 14px;\n        line-height: normal;\n        white-space: nowrap;\n        \n        /* Ensure no strange styles are inherited */\n        text-align: left;\n        direction: ltr;\n    ");
    return msg;
}
function copyTweets() {
    startProcess().catch(function (osrc_fehler) {
        if (osrc_fehler instanceof Error) {
            throwError(osrc_fehler);
        }
    });
}
function showSuccessFeedback() {
    var button = document.querySelector('#gemini-export-final-button');
    if (!button)
        return;
    var originalColor = window.getComputedStyle(button).backgroundColor || '#ffffff';
    button.style.backgroundColor = '#28a745';
    var successMessage = createPromptElement(button);
    document.body.appendChild(successMessage);
    setTimeout(function () {
        button.style.backgroundColor = originalColor;
        successMessage.remove();
    }, 1000);
}
function createPromptElement(btn) {
    return createGeneralPrompt(btn, 'Export successful!', '#28a745');
}
function initDragLogic(btn) {
    var isDragging = false;
    var dragStartX = 0, dragStartY = 0;
    var buttonStartX = 0, buttonStartY = 0;
    var moved = false;
    btn.addEventListener('mousedown', function (e) {
        startDragging(e.clientX, e.clientY);
        var move = function (evt) {
            var ev = evt;
            continueDragging(ev.clientX, ev.clientY);
        };
        var up = function () { return endDragging(move, up); };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
        e.preventDefault();
    });
    btn.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        if (!t)
            return;
        startDragging(t.clientX, t.clientY);
        var move = function (evt) {
            var ev = evt;
            var touch = ev.touches[0];
            if (touch)
                continueDragging(touch.clientX, touch.clientY);
        };
        var end = function () { return endDragging(move, end, true); };
        document.addEventListener('touchmove', move);
        document.addEventListener('touchend', end);
        e.preventDefault();
    });
    function startDragging(x, y) {
        isDragging = true;
        moved = false;
        dragStartX = x;
        dragStartY = y;
        buttonStartX = btn.offsetLeft;
        buttonStartY = btn.offsetTop;
        btn.style.transition = 'none';
    }
    function continueDragging(x, y) {
        if (!isDragging)
            return;
        var dx = x - dragStartX;
        var dy = y - dragStartY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5)
            moved = true;
        var maxX = window.innerWidth - btn.offsetWidth;
        var maxY = window.innerHeight - btn.offsetHeight;
        var newLeft = Math.max(0, Math.min(buttonStartX + dx, maxX));
        var newTop = Math.max(0, Math.min(buttonStartY + dy, maxY));
        btn.style.left = "".concat(newLeft, "px");
        btn.style.top = "".concat(newTop, "px");
        btn.style.right = 'auto';
        btn.style.transform = 'none';
    }
    function endDragging(move, end, touch) {
        if (touch === void 0) { touch = false; }
        isDragging = false;
        document.removeEventListener(touch ? 'touchmove' : 'mousemove', move);
        document.removeEventListener(touch ? 'touchend' : 'mouseup', end);
        setTimeout(function () {
            btn.style.transition = 'all 0.2s ease';
        }, 0);
        if (!moved)
            copyTweets();
    }
}
function startProcess() {
    return __awaiter(this, void 0, void 0, function () {
        var osrc_chatFenster, osrc_nachrichtenListe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger('Starting export process');
                    return [4 /*yield*/, waitForChatWindow()];
                case 1:
                    osrc_chatFenster = _a.sent();
                    if (!osrc_chatFenster) {
                        throwError(new Error('Chat window not found'));
                        return [2 /*return*/];
                    }
                    logger('Chat window found, starting to copy messages');
                    return [4 /*yield*/, copyWhileScrolling(osrc_chatFenster)];
                case 2:
                    osrc_nachrichtenListe = _a.sent();
                    if (!osrc_nachrichtenListe.length) {
                        throwError(new Error('Copy resulted in empty content'));
                        return [2 /*return*/];
                    }
                    logger("Successfully copied ".concat(osrc_nachrichtenListe.length, " messages"));
                    downloadMarkdown(osrc_nachrichtenListe);
                    showSuccessFeedback();
                    logger('Export process finished');
                    return [2 /*return*/];
            }
        });
    });
}
function waitForChatWindow() {
    return new Promise(function (osrc_resolve) {
        var osrc_intervall = setInterval(function () {
            var osrc_element = document.querySelector('chat-window infinite-scroller');
            if (osrc_element) {
                clearInterval(osrc_intervall);
                logger('Chat window element found');
                osrc_resolve(osrc_element);
            }
        }, 400);
    });
}
function getModelName(osrc_container) {
    var osrc_globalSpan = document.querySelector('button.gds-mode-switch-button .logo-pill-label-container > span');
    if (osrc_globalSpan && osrc_globalSpan.innerText.trim()) {
        var osrc_full = "Gemini ".concat(osrc_globalSpan.innerText.trim());
        logger("(Global) Found model name: ".concat(osrc_full));
        return osrc_full;
    }
    var osrc_localSpan = osrc_container.querySelector('.logo-pill-label-container > span:first-child');
    if (osrc_localSpan && osrc_localSpan.innerText.trim()) {
        var osrc_full = "Gemini ".concat(osrc_localSpan.innerText.trim());
        logger("(Local) Found model name: ".concat(osrc_full));
        return osrc_full;
    }
    logger('Could not find model version info, using default', 'warn');
    return 'Gemini';
}
function copyWhileScrolling(osrc_chatFenster) {
    return __awaiter(this, void 0, void 0, function () {
        var osrc_nachrichtenListe, osrc_responses, osrc_index, osrc_resp, osrc_container, osrc_user, osrc_gemini, osrc_model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    osrc_nachrichtenListe = [];
                    osrc_responses = Array.from(document.querySelectorAll('model-response'));
                    logger("Found ".concat(osrc_responses.length, " messages, processing one by one"));
                    osrc_index = 0;
                    _a.label = 1;
                case 1:
                    if (!(osrc_index < osrc_responses.length)) return [3 /*break*/, 5];
                    osrc_resp = osrc_responses[osrc_index];
                    if (!osrc_resp) {
                        logger("Message ".concat(osrc_index + 1, " does not exist, skipping"), 'warn');
                        return [3 /*break*/, 4];
                    }
                    osrc_container = osrc_resp.closest('.conversation-container');
                    if (!osrc_container) {
                        logger("Message ".concat(osrc_index + 1, " container not found, skipping"), 'warn');
                        return [3 /*break*/, 4];
                    }
                    logger("Processing message ".concat(osrc_index + 1, "/").concat(osrc_responses.length));
                    osrc_container.scrollIntoView({ block: 'center' });
                    return [4 /*yield*/, delayExecution(500)];
                case 2:
                    _a.sent();
                    osrc_user = extractUserText(osrc_container);
                    return [4 /*yield*/, copyGeminiMarkdown(osrc_resp)];
                case 3:
                    osrc_gemini = _a.sent();
                    osrc_model = getModelName(osrc_container);
                    osrc_nachrichtenListe.push({
                        id: osrc_container.id,
                        user: osrc_user,
                        gemini: osrc_gemini,
                        model: osrc_model
                    });
                    _a.label = 4;
                case 4:
                    osrc_index++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, osrc_nachrichtenListe];
            }
        });
    });
}
function extractUserText(osrc_container) {
    var osrc_zeilen = Array.from(osrc_container.querySelectorAll('.query-text-line'));
    var osrc_text = osrc_zeilen.map(function (osrc_zeile) {
        return osrc_zeile.innerText;
    }).join('\n').trim();
    return osrc_text || '[Empty]';
}
function findDavidCopyButton(osrc_resp) {
    return __awaiter(this, void 0, void 0, function () {
        var osrc_moreButton, osrc_icon, osrc_btn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    osrc_moreButton = osrc_resp.querySelector('.more-menu-button');
                    if (!osrc_moreButton) {
                        return [2 /*return*/, null];
                    }
                    osrc_moreButton.click();
                    return [4 /*yield*/, delayExecution(100)];
                case 1:
                    _a.sent();
                    osrc_icon = document.querySelector('.mat-menu-above mat-icon[data-mat-icon-name="content_copy"]');
                    if (!osrc_icon) {
                        document.body.click();
                        return [2 /*return*/, null];
                    }
                    osrc_btn = osrc_icon.closest('button');
                    return [2 /*return*/, osrc_btn];
            }
        });
    });
}
function extractCanvasMessage(osrc_resp) {
    var osrc_canvas = osrc_resp.querySelector('immersive-entry-chip');
    if (!osrc_canvas) {
        return null;
    }
    logger('Canvas message detected, starting extraction');
    var osrc_markdown = osrc_resp.querySelector('.markdown');
    var osrc_messageText = '';
    if (osrc_markdown) {
        osrc_messageText = htmlToMarkdown(osrc_markdown);
    }
    var osrc_titleElement = osrc_canvas.querySelector('[data-test-id="artifact-text"]');
    var osrc_title = osrc_titleElement ? osrc_titleElement.innerText.trim() : '[Untitled]';
    var osrc_timestampElement = osrc_canvas.querySelector('[data-test-id="creation-timestamp"]');
    var osrc_timestamp = osrc_timestampElement ? osrc_timestampElement.innerText.trim() : '';
    var osrc_result = osrc_messageText;
    if (osrc_result && !osrc_result.endsWith('\n')) {
        osrc_result += '\n\n';
    }
    osrc_result += "[Canvas: ".concat(osrc_title, "]");
    if (osrc_timestamp) {
        osrc_result += "\nCreated: ".concat(osrc_timestamp);
    }
    logger("Canvas message extraction complete: ".concat(osrc_title));
    return osrc_result;
}
function htmlToMarkdown(element) {
    var result = '';
    function processNode(node) {
        var _a, _b;
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent || '';
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
            return '';
        }
        var elem = node;
        var tagName = elem.tagName.toLowerCase();
        var content = '';
        for (var _i = 0, _c = Array.from(node.childNodes); _i < _c.length; _i++) {
            var child = _c[_i];
            content += processNode(child);
        }
        switch (tagName) {
            case 'h1': return "# ".concat(content.trim(), "\n\n");
            case 'h2': return "## ".concat(content.trim(), "\n\n");
            case 'h3': return "### ".concat(content.trim(), "\n\n");
            case 'h4': return "#### ".concat(content.trim(), "\n\n");
            case 'h5': return "##### ".concat(content.trim(), "\n\n");
            case 'h6': return "###### ".concat(content.trim(), "\n\n");
            case 'p':
                if (elem.hasAttribute('data-sourcepos')) {
                    return "".concat(content.trim(), "\n\n");
                }
                return "".concat(content.trim(), "\n\n");
            case 'strong':
            case 'b':
                return "**".concat(content, "**");
            case 'em':
            case 'i':
                return "*".concat(content, "*");
            case 'code':
                if (elem.parentElement && elem.parentElement.tagName.toLowerCase() === 'pre') {
                    return content;
                }
                return "`".concat(content, "`");
            case 'pre':
                var codeElem = elem.querySelector('code');
                if (codeElem) {
                    var lang = ((_a = codeElem.className.match(/language-(\w+)/)) === null || _a === void 0 ? void 0 : _a[1]) || '';
                    return "```".concat(lang, "\n").concat((_b = codeElem.textContent) === null || _b === void 0 ? void 0 : _b.trim(), "\n```\n\n");
                }
                return "```\n".concat(content.trim(), "\n```\n\n");
            case 'a':
                var href = elem.getAttribute('href');
                if (href) {
                    return "[".concat(content, "](").concat(href, ")");
                }
                return content;
            case 'ul':
            case 'ol':
                return content + '\n';
            case 'li':
                var parent_1 = elem.parentElement;
                if (parent_1 && parent_1.tagName.toLowerCase() === 'ol') {
                    var index = Array.from(parent_1.children).indexOf(elem) + 1;
                    return "".concat(index, ". ").concat(content.trim(), "\n");
                }
                var sourcePos = elem.getAttribute('data-sourcepos');
                var indent = '';
                if (sourcePos) {
                    var parts = sourcePos.split(':');
                    if (parts[0]) {
                        var depth = parts[0].split('.').length - 2;
                        indent = '  '.repeat(Math.max(0, depth));
                    }
                }
                return "".concat(indent, "- ").concat(content.trim(), "\n");
            case 'br':
                return '\n';
            case 'hr':
                return '\n---\n\n';
            case 'blockquote':
                return content.split('\n').map(function (line) { return line.trim() ? "> ".concat(line) : '>'; }).join('\n') + '\n\n';
            case 'img':
                var src = elem.getAttribute('src');
                var alt = elem.getAttribute('alt') || '';
                if (src) {
                    return "![".concat(alt, "](").concat(src, ")");
                }
                return '';
            case 'div':
            case 'span':
                if (elem.classList.contains('attachment-container')) {
                    return '';
                }
                return content;
            default:
                return content;
        }
    }
    result = processNode(element);
    result = result.replace(/\n{3,}/g, '\n\n').trim();
    return result;
}
function showErrorTooltip(osrc_message) {
    var osrc_btn = document.querySelector('#gemini-export-final-button');
    if (!osrc_btn)
        return;
    var osrc_msg = document.createElement('div');
    osrc_msg.textContent = osrc_message;
    osrc_msg.style.position = 'fixed';
    var rect = osrc_btn.getBoundingClientRect();
    osrc_msg.style.top = "".concat(rect.bottom + 10, "px");
    osrc_msg.style.left = "".concat(rect.left + rect.width / 2, "px");
    osrc_msg.style.transform = 'translateX(-50%)';
    osrc_msg.style.backgroundColor = '#dc3545';
    osrc_msg.style.color = '#fff';
    osrc_msg.style.padding = '5px 10px';
    osrc_msg.style.borderRadius = '5px';
    osrc_msg.style.zIndex = '1000';
    document.body.appendChild(osrc_msg);
    setTimeout(function () {
        osrc_msg.remove();
    }, 2000);
}
function copyGeminiMarkdown(osrc_resp) {
    return __awaiter(this, void 0, void 0, function () {
        var osrc_btn, osrc_davidBtn, osrc_canvasContent, osrc_versuch, osrc_text, osrc_bereinigterText, osrc_fehler_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    osrc_btn = osrc_resp.querySelector('copy-button button:not([aria-disabled])');
                    if (!!osrc_btn) return [3 /*break*/, 2];
                    logger('Main copy button not found, trying fallback method', 'warn');
                    return [4 /*yield*/, findDavidCopyButton(osrc_resp)];
                case 1:
                    osrc_davidBtn = _a.sent();
                    if (!osrc_davidBtn) {
                        logger('Fallback copy button also not found, trying to extract from canvas', 'warn');
                        osrc_canvasContent = extractCanvasMessage(osrc_resp);
                        if (osrc_canvasContent) {
                            return [2 /*return*/, osrc_canvasContent];
                        }
                        showErrorTooltip('Could not copy this message');
                        return [2 /*return*/, '[Copy failed]'];
                    }
                    osrc_btn = osrc_davidBtn;
                    _a.label = 2;
                case 2:
                    osrc_btn.click();
                    osrc_versuch = 0;
                    _a.label = 3;
                case 3:
                    if (!(osrc_versuch < 12)) return [3 /*break*/, 9];
                    return [4 /*yield*/, delayExecution(120)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, navigator.clipboard.readText()];
                case 6:
                    osrc_text = _a.sent();
                    osrc_bereinigterText = osrc_text.trim();
                    if (osrc_bereinigterText) {
                        if (!osrc_resp.querySelector('copy-button button:not([aria-disabled])')) {
                            document.body.click();
                        }
                        return [2 /*return*/, osrc_bereinigterText];
                    }
                    return [3 /*break*/, 8];
                case 7:
                    osrc_fehler_1 = _a.sent();
                    if (osrc_fehler_1.name === 'NotAllowedError') {
                        alert('Please do not switch tabs or windows! The script needs focus to read the clipboard.');
                        logger('Document lost focus, cannot read clipboard', 'error');
                        throw osrc_fehler_1;
                    }
                    logger("Clipboard read failed, retry ".concat(osrc_versuch + 1, "/12"), 'warn');
                    return [3 /*break*/, 8];
                case 8:
                    osrc_versuch++;
                    return [3 /*break*/, 3];
                case 9:
                    logger('Copy timed out', 'warn');
                    return [2 /*return*/, '[Copy timed out]'];
            }
        });
    });
}
function downloadMarkdown(osrc_nachrichtenListe) {
    var osrc_zeilen = [];
    for (var _i = 0, osrc_nachrichtenListe_1 = osrc_nachrichtenListe; _i < osrc_nachrichtenListe_1.length; _i++) {
        var osrc_nachricht = osrc_nachrichtenListe_1[_i];
        var osrc_zeile = "### User\n".concat(osrc_nachricht.user, "\n\n### ").concat(osrc_nachricht.model, "\n").concat(osrc_nachricht.gemini, "\n\n---\n");
        osrc_zeilen.push(osrc_zeile);
    }
    var osrc_markdown = osrc_zeilen.join('\n');
    var osrc_blob = new Blob([osrc_markdown], { type: 'text/markdown' });
    var osrc_url = URL.createObjectURL(osrc_blob);
    var osrc_jetzt = new Date();
    var osrc_jahr = osrc_jetzt.getUTCFullYear();
    var osrc_monat = String(osrc_jetzt.getUTCMonth() + 1).padStart(2, '0');
    var osrc_tag = String(osrc_jetzt.getUTCDate()).padStart(2, '0');
    var osrc_stunde = String(osrc_jetzt.getUTCHours()).padStart(2, '0');
    var osrc_minute = String(osrc_jetzt.getUTCMinutes()).padStart(2, '0');
    var osrc_sekunde = String(osrc_jetzt.getUTCSeconds()).padStart(2, '0');
    var osrc_dateiname = "".concat(osrc_jahr, "-").concat(osrc_monat, "-").concat(osrc_tag, "-").concat(osrc_stunde).concat(osrc_minute).concat(osrc_sekunde, ".md");
    var osrc_link = document.createElement('a');
    osrc_link.href = osrc_url;
    osrc_link.download = osrc_dateiname;
    osrc_link.click();
    URL.revokeObjectURL(osrc_url);
    logger("File downloaded: ".concat(osrc_dateiname));
}
function delayExecution(osrc_millisekunden) {
    return new Promise(function (osrc_resolve) {
        setTimeout(osrc_resolve, osrc_millisekunden);
    });
}
function throwError(osrc_fehler) {
    logger(osrc_fehler.message, 'error');
    alert(osrc_fehler.message);
}
