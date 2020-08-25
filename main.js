/*
 * MIT License
 *
 * Copyright (c) 2020 Koki Fukuda
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

let resultVisible = false;

const toggleVisibility = () => {
    if (resultVisible) {
        hideSpamResults();
    } else {
        document.querySelectorAll('.hidden-result').forEach((e) => {
            e.classList.remove('hidden-result');
        });
    }
    resultVisible = !resultVisible;
};

const createStatFieldIfNeeded = () => {
    if (!document.getElementById('__wsf--reduce-stat')) {
        const el = document.createElement('span');
        el.id = '__wsf--reduce-stat';
        el.addEventListener('click', toggleVisibility);
        el.classList.add('filter-stat');
        document.getElementById('result-stats')
                .appendChild(el);
    }
};

const updateStats = (reduced) => {
    if (reduced) {
        createStatFieldIfNeeded();
        document.getElementById('__wsf--reduce-stat')
                .innerText = browser.i18n.getMessage('countRemoved', reduced);
    }
};

const hideSpamResults = () => {
    let reduced = 0;

    let results = document.querySelectorAll('div.g');
    for (let i = 0; i < results.length; ++i) {
        const result = results[i];

        const link = result.querySelector('div.r > a');
        if (!link) return;


        const href = link.href;
        for (let j = 0; j < noiseDomains.length; ++j) {
            if (href.search(noiseDomains[j]) !== -1) {
                result.classList.add('hidden-result');
                link.classList.add('noisy-link');

                ++reduced;
                break;
            }
        }
    }

    updateStats(reduced);
};

hideSpamResults();

const css = `
.hidden-result {
  display: none;
}
.filter-stat {
  cursor: pointer;
  user-select: none;
}`;

const sty = document.createElement('style');
sty.innerText = css;
document.head.appendChild(sty);
