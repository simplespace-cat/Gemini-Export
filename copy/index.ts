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
// @downloadURL https://raw.githubusercontent.com/simplespace-cat/Gemini-Export/main/copy/index.user.js
// @updateURL   https://raw.githubusercontent.com/simplespace-cat/Gemini-Export/main/copy/index.user.js
// ==/UserScript==

// open source version

interface Nachricht {
    id: string;
    user: string;
    gemini: string;
    model: string;
}

type LogStufe = 'log' | 'warn' | 'error';

function logger(osrc_nachricht: string, osrc_stufe: LogStufe = 'log'): void {
    const osrc_zeitstempel = new Date().toISOString();
    console[osrc_stufe](`[GeminiExport ${osrc_zeitstempel}] ${osrc_nachricht}`);
}

(function mainEntry(): void {
    logger('Script started');
    createCopyButton();
})();


/**
 * Helper function: Inject CSS styles.
 * @param css The CSS rules string to inject.
 */
function injectCss(css: string): void {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}

/**
 * Core function: Create the copy button (using createElementNS).
 * This version safely builds the DOM programmatically, bypassing Trusted Types restrictions.
 */
function createCopyButton() {
    const css = `
        #gemini-export-final-button {
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #ffffff; /* White background to display the SVG gradient */
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 99999;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); /* Add shadow for a layered look */
        }
        #gemini-export-final-button:hover {
            transform: translateY(-50%) scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        #gemini-export-final-button svg {
            width: 28px;
            height: 28px;
        }
    `;
    injectCss(css);

    const button = document.createElement('button');
    button.id = 'gemini-export-final-button';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '28');
    svg.setAttribute('height', '28');
    svg.setAttribute('viewBox', '0 0 28 28');
    svg.setAttribute('fill', 'none');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const radialGradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    radialGradient.setAttribute('id', 'paint0_radial_16771_53212');
    radialGradient.setAttribute('cx', '0');
    radialGradient.setAttribute('cy', '0');
    radialGradient.setAttribute('r', '1');
    radialGradient.setAttribute('gradientUnits', 'userSpaceOnUse');
    radialGradient.setAttribute('gradientTransform', 'translate(2.77876 11.3795) rotate(18.6832) scale(29.8025 238.737)');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0.0671246');
    stop1.setAttribute('stop-color', '#9168C0');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '0.342551');
    stop2.setAttribute('stop-color', '#5684D1');

    const stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '0.672076');
    stop3.setAttribute('stop-color', '#1BA1E3');

    radialGradient.appendChild(stop1);
    radialGradient.appendChild(stop2);
    radialGradient.appendChild(stop3);
    defs.appendChild(radialGradient);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
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
function createGeneralPrompt(btn: HTMLButtonElement, text: string, color: string): HTMLDivElement {
    const msg = document.createElement('div');
    msg.textContent = text;

    const rect = btn.getBoundingClientRect();

    msg.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 10}px;
        left: ${rect.left + rect.width / 2}px;
        transform: translateX(-50%);
        background-color: ${color};
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        z-index: 1000;
        
        /* Fix for vertical layout and font */
        writing-mode: horizontal-tb !important;
        text-orientation: mixed !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        font-size: 14px;
        line-height: normal;
        white-space: nowrap;
        
        /* Ensure no strange styles are inherited */
        text-align: left;
        direction: ltr;
    `;

    return msg;
}




function copyTweets() {
    startProcess().catch(osrc_fehler => {
        if (osrc_fehler instanceof Error) {
            throwError(osrc_fehler);
        }
    });
}

function showSuccessFeedback() {
    const button = document.querySelector<HTMLButtonElement>('#gemini-export-final-button');
    if (!button) return;

    const originalColor = window.getComputedStyle(button).backgroundColor || '#ffffff';
    button.style.backgroundColor = '#28a745';
    const successMessage = createPromptElement(button);
    document.body.appendChild(successMessage);

    setTimeout(() => {
        button.style.backgroundColor = originalColor;
        successMessage.remove();
    }, 1000);
}


function createPromptElement(btn: HTMLButtonElement): HTMLDivElement {
    return createGeneralPrompt(btn, 'Export successful!', '#28a745');
}


function initDragLogic(btn: HTMLButtonElement): void {
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let buttonStartX = 0, buttonStartY = 0;
    let moved = false;


    btn.addEventListener('mousedown', (e: MouseEvent) => {
        startDragging(e.clientX, e.clientY);

        const move: EventListener = evt => {
            const ev = evt as MouseEvent;
            continueDragging(ev.clientX, ev.clientY);
        };
        const up: EventListener = () => endDragging(move, up);

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
        e.preventDefault();
    });

    btn.addEventListener('touchstart', (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        startDragging(t.clientX, t.clientY);

        const move: EventListener = evt => {
            const ev = evt as TouchEvent;
            const touch = ev.touches[0];
            if (touch) continueDragging(touch.clientX, touch.clientY);
        };
        const end: EventListener = () => endDragging(move, end, true);

        document.addEventListener('touchmove', move);
        document.addEventListener('touchend', end);
        e.preventDefault();
    });


    function startDragging(x: number, y: number): void {
        isDragging = true;
        moved = false;
        dragStartX = x;
        dragStartY = y;
        buttonStartX = btn.offsetLeft;
        buttonStartY = btn.offsetTop;
        
        btn.style.transition = 'none';
    }

    function continueDragging(x: number, y: number): void {
        if (!isDragging) return;
        const dx = x - dragStartX;
        const dy = y - dragStartY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;

        const maxX = window.innerWidth - btn.offsetWidth;
        const maxY = window.innerHeight - btn.offsetHeight;
        const newLeft = Math.max(0, Math.min(buttonStartX + dx, maxX));
        const newTop = Math.max(0, Math.min(buttonStartY + dy, maxY));

        btn.style.left = `${newLeft}px`;
        btn.style.top = `${newTop}px`;
        btn.style.right = 'auto';
        btn.style.transform = 'none';
    }

     function endDragging(move: EventListener, end: EventListener, touch: boolean = false): void {
        isDragging = false;
        document.removeEventListener(touch ? 'touchmove' : 'mousemove', move);
        document.removeEventListener(touch ? 'touchend' : 'mouseup', end);
        
        setTimeout(() => {
            btn.style.transition = 'all 0.2s ease';
        }, 0);
        
        if (!moved) copyTweets();
    }
}




async function startProcess(): Promise<void> {
    logger('Starting export process');

    const osrc_chatFenster = await waitForChatWindow();
    if (!osrc_chatFenster) {
        throwError(new Error('Chat window not found'));
        return;
    }

    logger('Chat window found, starting to copy messages');

    const osrc_nachrichtenListe = await copyWhileScrolling(osrc_chatFenster);

    if (!osrc_nachrichtenListe.length) {
        throwError(new Error('Copy resulted in empty content'));
        return;
    }

    logger(`Successfully copied ${osrc_nachrichtenListe.length} messages`);
    downloadMarkdown(osrc_nachrichtenListe);
    showSuccessFeedback();
    logger('Export process finished');
}

function waitForChatWindow(): Promise<Element | null> {
    return new Promise(function (osrc_resolve): void {
        const osrc_intervall = setInterval(function (): void {
            const osrc_element = document.querySelector('chat-window infinite-scroller');
            if (osrc_element) {
                clearInterval(osrc_intervall);
                logger('Chat window element found');
                osrc_resolve(osrc_element);
            }
        }, 400);
    });
}

function getModelName(osrc_container: Element): string {
    const osrc_globalSpan = document.querySelector(
        'button.gds-mode-switch-button .logo-pill-label-container > span'
    ) as HTMLElement | null;

    if (osrc_globalSpan && osrc_globalSpan.innerText.trim()) {
        const osrc_full = `Gemini ${osrc_globalSpan.innerText.trim()}`;
        logger(`(Global) Found model name: ${osrc_full}`);
        return osrc_full;
    }

    const osrc_localSpan = osrc_container.querySelector(
        '.logo-pill-label-container > span:first-child'
    ) as HTMLElement | null;

    if (osrc_localSpan && osrc_localSpan.innerText.trim()) {
        const osrc_full = `Gemini ${osrc_localSpan.innerText.trim()}`;
        logger(`(Local) Found model name: ${osrc_full}`);
        return osrc_full;
    }

    logger('Could not find model version info, using default', 'warn');
    return 'Gemini';
}


async function copyWhileScrolling(osrc_chatFenster: Element): Promise<Nachricht[]> {
    const osrc_nachrichtenListe: Nachricht[] = [];
    const osrc_responses: Element[] = Array.from(document.querySelectorAll('model-response'));

    logger(`Found ${osrc_responses.length} messages, processing one by one`);

    for (let osrc_index = 0; osrc_index < osrc_responses.length; osrc_index++) {
        const osrc_resp = osrc_responses[osrc_index];

        if (!osrc_resp) {
            logger(`Message ${osrc_index + 1} does not exist, skipping`, 'warn');
            continue;
        }

        const osrc_container = osrc_resp.closest('.conversation-container');

        if (!osrc_container) {
            logger(`Message ${osrc_index + 1} container not found, skipping`, 'warn');
            continue;
        }

        logger(`Processing message ${osrc_index + 1}/${osrc_responses.length}`);

        osrc_container.scrollIntoView({ block: 'center' });
        await delayExecution(500);

        const osrc_user = extractUserText(osrc_container);
        const osrc_gemini = await copyGeminiMarkdown(osrc_resp);
        const osrc_model = getModelName(osrc_container);

        osrc_nachrichtenListe.push({
            id: osrc_container.id,
            user: osrc_user,
            gemini: osrc_gemini,
            model: osrc_model
        });
    }

    return osrc_nachrichtenListe;
}

function extractUserText(osrc_container: Element): string {
    const osrc_zeilen = Array.from(osrc_container.querySelectorAll('.query-text-line'));
    const osrc_text = osrc_zeilen.map(function (osrc_zeile): string {
        return (osrc_zeile as HTMLElement).innerText;
    }).join('\n').trim();

    return osrc_text || '[Empty]';
}

async function findDavidCopyButton(osrc_resp: Element): Promise<HTMLButtonElement | null> {
    const osrc_moreButton = osrc_resp.querySelector('.more-menu-button') as HTMLButtonElement;
    if (!osrc_moreButton) {
        return null;
    }

    osrc_moreButton.click();
    await delayExecution(100);

    const osrc_icon = document.querySelector('.mat-menu-above mat-icon[data-mat-icon-name="content_copy"]');
    if (!osrc_icon) {
        document.body.click();
        return null;
    }

    const osrc_btn = osrc_icon.closest('button') as HTMLButtonElement;
    return osrc_btn;
}

function extractCanvasMessage(osrc_resp: Element): string | null {
    const osrc_canvas = osrc_resp.querySelector('immersive-entry-chip');
    if (!osrc_canvas) {
        return null;
    }

    logger('Canvas message detected, starting extraction');

    const osrc_markdown = osrc_resp.querySelector('.markdown');
    let osrc_messageText = '';
    if (osrc_markdown) {
        osrc_messageText = htmlToMarkdown(osrc_markdown);
    }

    const osrc_titleElement = osrc_canvas.querySelector('[data-test-id="artifact-text"]');
    const osrc_title = osrc_titleElement ? (osrc_titleElement as HTMLElement).innerText.trim() : '[Untitled]';

    const osrc_timestampElement = osrc_canvas.querySelector('[data-test-id="creation-timestamp"]');
    const osrc_timestamp = osrc_timestampElement ? (osrc_timestampElement as HTMLElement).innerText.trim() : '';

    let osrc_result = osrc_messageText;
    if (osrc_result && !osrc_result.endsWith('\n')) {
        osrc_result += '\n\n';
    }
    osrc_result += `[Canvas: ${osrc_title}]`;
    if (osrc_timestamp) {
        osrc_result += `\nCreated: ${osrc_timestamp}`;
    }

    logger(`Canvas message extraction complete: ${osrc_title}`);
    return osrc_result;
}

function htmlToMarkdown(element: Element): string {
    let result = '';

    function processNode(node: Node): string {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent || '';
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return '';
        }

        const elem = node as Element;
        const tagName = elem.tagName.toLowerCase();
        let content = '';

        for (const child of Array.from(node.childNodes)) {
            content += processNode(child);
        }

        switch (tagName) {
            case 'h1': return `# ${content.trim()}\n\n`;
            case 'h2': return `## ${content.trim()}\n\n`;
            case 'h3': return `### ${content.trim()}\n\n`;
            case 'h4': return `#### ${content.trim()}\n\n`;
            case 'h5': return `##### ${content.trim()}\n\n`;
            case 'h6': return `###### ${content.trim()}\n\n`;

            case 'p':
                if (elem.hasAttribute('data-sourcepos')) {
                    return `${content.trim()}\n\n`;
                }
                return `${content.trim()}\n\n`;

            case 'strong':
            case 'b':
                return `**${content}**`;

            case 'em':
            case 'i':
                return `*${content}*`;

            case 'code':
                if (elem.parentElement && elem.parentElement.tagName.toLowerCase() === 'pre') {
                    return content;
                }
                return `\`${content}\``;

            case 'pre':
                const codeElem = elem.querySelector('code');
                if (codeElem) {
                    const lang = codeElem.className.match(/language-(\w+)/)?.[1] || '';
                    return `\`\`\`${lang}\n${codeElem.textContent?.trim()}\n\`\`\`\n\n`;
                }
                return `\`\`\`\n${content.trim()}\n\`\`\`\n\n`;

            case 'a':
                const href = elem.getAttribute('href');
                if (href) {
                    return `[${content}](${href})`;
                }
                return content;

            case 'ul':
            case 'ol':
                return content + '\n';

            case 'li':
                const parent = elem.parentElement;
                if (parent && parent.tagName.toLowerCase() === 'ol') {
                    const index = Array.from(parent.children).indexOf(elem) + 1;
                    return `${index}. ${content.trim()}\n`;
                }
                const sourcePos = elem.getAttribute('data-sourcepos');
                let indent = '';
                if (sourcePos) {
                    const parts = sourcePos.split(':');
                    if (parts[0]) {
                        const depth = parts[0].split('.').length - 2;
                        indent = '  '.repeat(Math.max(0, depth));
                    }
                }
                return `${indent}- ${content.trim()}\n`;

            case 'br':
                return '\n';

            case 'hr':
                return '\n---\n\n';

            case 'blockquote':
                return content.split('\n').map(line => line.trim() ? `> ${line}` : '>').join('\n') + '\n\n';

            case 'img':
                const src = elem.getAttribute('src');
                const alt = elem.getAttribute('alt') || '';
                if (src) {
                    return `![${alt}](${src})`;
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

function showErrorTooltip(osrc_message: string): void {
    const osrc_btn = document.querySelector<HTMLButtonElement>('#gemini-export-final-button');
    if (!osrc_btn) return;

    const osrc_msg = document.createElement('div');
    osrc_msg.textContent = osrc_message;
    osrc_msg.style.position = 'fixed';
    const rect = osrc_btn.getBoundingClientRect();
    osrc_msg.style.top = `${rect.bottom + 10}px`;
    osrc_msg.style.left = `${rect.left + rect.width / 2}px`;
    osrc_msg.style.transform = 'translateX(-50%)';
    osrc_msg.style.backgroundColor = '#dc3545';
    osrc_msg.style.color = '#fff';
    osrc_msg.style.padding = '5px 10px';
    osrc_msg.style.borderRadius = '5px';
    osrc_msg.style.zIndex = '1000';

    document.body.appendChild(osrc_msg);

    setTimeout(() => {
        osrc_msg.remove();
    }, 2000);
}

async function copyGeminiMarkdown(osrc_resp: Element): Promise<string> {
    let osrc_btn: HTMLButtonElement | null = osrc_resp.querySelector('copy-button button:not([aria-disabled])') as HTMLButtonElement;

    if (!osrc_btn) {
        logger('Main copy button not found, trying fallback method', 'warn');
        const osrc_davidBtn = await findDavidCopyButton(osrc_resp);

        if (!osrc_davidBtn) {
            logger('Fallback copy button also not found, trying to extract from canvas', 'warn');

            const osrc_canvasContent = extractCanvasMessage(osrc_resp);
            if (osrc_canvasContent) {
                return osrc_canvasContent;
            }

            showErrorTooltip('Could not copy this message');
            return '[Copy failed]';
        }

        osrc_btn = osrc_davidBtn;
    }

    osrc_btn.click();

    for (let osrc_versuch = 0; osrc_versuch < 12; osrc_versuch++) {
        await delayExecution(120);

        try {
            const osrc_text = await navigator.clipboard.readText();
            const osrc_bereinigterText = osrc_text.trim();

            if (osrc_bereinigterText) {
                if (!osrc_resp.querySelector('copy-button button:not([aria-disabled])')) {
                    document.body.click();
                }
                return osrc_bereinigterText;
            }
        } catch (osrc_fehler: any) {
            if (osrc_fehler.name === 'NotAllowedError') {
                alert('Please do not switch tabs or windows! The script needs focus to read the clipboard.');
                logger('Document lost focus, cannot read clipboard', 'error');
                throw osrc_fehler;
            }
            logger(`Clipboard read failed, retry ${osrc_versuch + 1}/12`, 'warn');
        }
    }

    logger('Copy timed out', 'warn');
    return '[Copy timed out]';
}

function downloadMarkdown(osrc_nachrichtenListe: Nachricht[]): void {
    const osrc_zeilen: string[] = [];

    for (const osrc_nachricht of osrc_nachrichtenListe) {
        const osrc_zeile = `### User\n${osrc_nachricht.user}\n\n### ${osrc_nachricht.model}\n${osrc_nachricht.gemini}\n\n---\n`;
        osrc_zeilen.push(osrc_zeile);
    }

    const osrc_markdown = osrc_zeilen.join('\n');
    const osrc_blob = new Blob([osrc_markdown], { type: 'text/markdown' });
    const osrc_url = URL.createObjectURL(osrc_blob);

    const osrc_jetzt = new Date();
    const osrc_jahr = osrc_jetzt.getUTCFullYear();
    const osrc_monat = String(osrc_jetzt.getUTCMonth() + 1).padStart(2, '0');
    const osrc_tag = String(osrc_jetzt.getUTCDate()).padStart(2, '0');
    const osrc_stunde = String(osrc_jetzt.getUTCHours()).padStart(2, '0');
    const osrc_minute = String(osrc_jetzt.getUTCMinutes()).padStart(2, '0');
    const osrc_sekunde = String(osrc_jetzt.getUTCSeconds()).padStart(2, '0');

    const osrc_dateiname = `${osrc_jahr}-${osrc_monat}-${osrc_tag}-${osrc_stunde}${osrc_minute}${osrc_sekunde}.md`;

    const osrc_link = document.createElement('a');
    osrc_link.href = osrc_url;
    osrc_link.download = osrc_dateiname;
    osrc_link.click();

    URL.revokeObjectURL(osrc_url);
    logger(`File downloaded: ${osrc_dateiname}`);
}

function delayExecution(osrc_millisekunden: number): Promise<void> {
    return new Promise(function (osrc_resolve): void {
        setTimeout(osrc_resolve, osrc_millisekunden);
    });
}

function throwError(osrc_fehler: Error): void {
    logger(osrc_fehler.message, 'error');
    alert(osrc_fehler.message);
}
