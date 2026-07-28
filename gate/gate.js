/* Beta gate for the writing section. A mild deterrent, not a vault.
   Any name is accepted and recorded; one password opens the room.
   Removed at public launch. */
(function () {
  var KEY = 'bfo_reading_room';
  var BOOK = 'https://killdozer.biggestblackestbox.com/guestbook';

  if (localStorage.getItem(KEY)) return;

  function sign(name, admitted) {
    try {
      fetch(BOOK + '?u=' + encodeURIComponent(name) + '&ok=' + (admitted ? 1 : 0), {
        mode: 'no-cors',
        keepalive: true
      });
    } catch (_) {}
  }

  function build() {
    var gate = document.createElement('div');
    gate.className = 'bfo-gate';
    gate.innerHTML =
      '<div class="bfo-gate-panel">' +
      '<p class="bfo-gate-firm">Bell Family Office</p>' +
      '<h1 class="bfo-gate-title">The writing is in private circulation</h1>' +
      '<p class="bfo-gate-note">Sign the book to enter. The password was provided with your invitation.</p>' +
      '<form novalidate>' +
      '<label for="bfo-name">Your name</label>' +
      '<input id="bfo-name" name="visitor" type="text" autocomplete="name" autocapitalize="words">' +
      '<label for="bfo-key">Password</label>' +
      '<input id="bfo-key" name="key" type="password" autocomplete="off">' +
      '<p class="bfo-gate-error" aria-live="polite"></p>' +
      '<button type="submit">Enter</button>' +
      '</form>' +
      '</div>';
    document.body.appendChild(gate);

    var form = gate.querySelector('form');
    var err = gate.querySelector('.bfo-gate-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.visitor.value.trim();
      var key = form.elements.key.value;
      if (!name) { err.textContent = 'The book requires a name.'; return; }
      var admitted = false;
      try { admitted = btoa(key) === 'cGFzc3dvcmQ='; } catch (_) {}
      sign(name, admitted);
      if (!admitted) {
        err.textContent = 'That is not the password.';
        form.elements.key.value = '';
        form.elements.key.focus();
        return;
      }
      localStorage.setItem(KEY, name);
      document.documentElement.classList.remove('bfo-locked');
      gate.remove();
    });

    form.elements.visitor.focus();
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
