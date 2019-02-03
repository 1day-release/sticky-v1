// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

el = {
  app: '#app',
  sections: {
    about: '#about',
    activities: '#activities',
    works: '#works',
    members: '#members',
    contact: '#contact',
  },
  menu: {
    button: '.menu-button',
    nav: '.menu-list'
  }
}

module.exports = {
  'sections exist': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible(el.app, 5000)
      .assert.elementPresent(el.sections.about)
      .assert.elementPresent(el.sections.activities)
      .assert.elementPresent(el.sections.works)
      .assert.elementPresent(el.sections.members)
      .assert.elementPresent(el.sections.contact)
      // .assert.containsText('h1', 'Welcome to Your Vue.js App')
      // .assert.elementCount('img', 1)
      .end()
  },
  'menu open and close': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.hidden(el.menu.nav)
      .click(el.menu.button)
      .assert.visible(el.menu.nav)
      .click(el.menu.button)
      .assert.hidden(el.menu.nav)
      .end()
  }
}
