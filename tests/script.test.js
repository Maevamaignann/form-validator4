const test = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');

function setupDom() {
  const dom = new JSDOM(`
    <form id="form" class="form">
      <div class="form-control"><input id="username" /><small></small></div>
      <div class="form-control"><input id="email" /><small></small></div>
      <div class="form-control"><input id="password" /><small></small></div>
      <div class="form-control"><input id="password2" /><small></small></div>
    </form>
  `);

  global.window = dom.window;
  global.document = dom.window.document;

  delete require.cache[require.resolve('../script.js')];
  const validators = require('../script.js');

  return {
    ...validators,
    username: document.getElementById('username'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    password2: document.getElementById('password2')
  };
}

test('checkEmail met le champ en succès pour un email valide', () => {
  const { checkEmail, email } = setupDom();
  email.value = 'test@example.com';

  checkEmail(email);

  assert.equal(email.parentElement.className, 'form-control success');
});

test('checkEmail met le champ en erreur pour un email invalide', () => {
  const { checkEmail, email } = setupDom();
  email.value = 'email-invalide';

  checkEmail(email);

  assert.equal(email.parentElement.className, 'form-control error');
  assert.equal(email.parentElement.querySelector('small').innerText, 'Email is not valid');
});

test('checkRequired détecte les champs obligatoires vides', () => {
  const { checkRequired, username, email } = setupDom();

  const hasMissingFields = checkRequired([username, email]);

  assert.equal(hasMissingFields, true);
  assert.equal(username.parentElement.className, 'form-control error');
  assert.equal(email.parentElement.className, 'form-control error');
});

test('checkRequired valide les champs obligatoires remplis', () => {
  const { checkRequired, username, email } = setupDom();
  username.value = 'alice';
  email.value = 'alice@example.com';

  const hasMissingFields = checkRequired([username, email]);

  assert.equal(hasMissingFields, false);
  assert.equal(username.parentElement.className, 'form-control success');
  assert.equal(email.parentElement.className, 'form-control success');
});

test('checkLength signale une longueur minimale non respectée', () => {
  const { checkLength, username } = setupDom();
  username.value = 'ab';

  checkLength(username, 3, 15);

  assert.equal(username.parentElement.className, 'form-control error');
  assert.match(username.parentElement.querySelector('small').innerText, /at least 3/);
});

test('checkLength signale une longueur maximale dépassée', () => {
  const { checkLength, username } = setupDom();
  username.value = 'a'.repeat(16);

  checkLength(username, 3, 15);

  assert.equal(username.parentElement.className, 'form-control error');
  assert.match(username.parentElement.querySelector('small').innerText, /less than 15/);
});

test('checkLength valide une longueur comprise dans les bornes', () => {
  const { checkLength, username } = setupDom();
  username.value = 'valide';

  checkLength(username, 3, 15);

  assert.equal(username.parentElement.className, 'form-control success');
});

test('checkPasswordsMatch signale des mots de passe différents', () => {
  const { checkPasswordsMatch, password, password2 } = setupDom();
  password.value = 'MonMotDePasse123';
  password2.value = 'AutreMotDePasse123';

  checkPasswordsMatch(password, password2);

  assert.equal(password2.parentElement.className, 'form-control error');
  assert.equal(password2.parentElement.querySelector('small').innerText, 'Passwords do not match');
});
