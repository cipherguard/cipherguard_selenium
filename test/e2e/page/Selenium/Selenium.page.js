/**
 * Cipherguard ~ Open source password manager for teams
 * Copyright (c) Cipherguard SA (https://www.cipherguard.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cipherguard SA (https://www.cipherguard.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.cipherguard.com Cipherguard(tm)
 * @since         v3.0.0
 */

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SeleniumPage {
  /**
   * define selectors using getter methods
   */
  get redirectButton() {
    return $(".buttonContent a");
  }

  /**
   * return the email body
   */
  get emailBody() {
    return $("#emailBody");
  }

  /**
   * return the email body
   */
  get emailInformations() {
    return this.emailBody.$("table[align='Right']");
  }

  /**
   * return the email body
   */
  get emailSubject() {
    return this.emailInformations.$("td[valign='top']").$$("span")[1];
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to reset instance default
   */
  async resetInstanceDefault() {
    await browser.url("seleniumtests/resetInstance/default");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to show last email and go to the url
   */
  async showLastEmailAndRedirect(username, emailType = "") {
    // force a wait to be sure the email has been received
    await this.showLastEmail(username, emailType)
    return this.clickOnRedirection();
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to show last email 
   */
  async showLastEmail(username, emailType = "") {
    const url = `showLastEmail/${username}?filter[has-type]=${encodeURIComponent(emailType)}`;
    // force a wait to be sure the email has been received
    await browser.pause(1000);
    await this.openUrl(url);
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. check the subject content
   */
  async checkSubjectContent(user, text, emailType = "") {
    await this.showLastEmail(user, emailType);
    await this.emailSubject.waitForExist();
    const subject = await this.emailSubject.getText();
    expect(subject).toEqual(text)
  }

  /**
 * a method to encapsule automation code to interact with the page
 * e.g. click on redirection button from email
 */
  async clickOnRedirection() {
    await this.redirectButton.waitForExist();
    const url = await this.redirectButton.getAttribute("href");
    await browser.url(url);
  }

  /**
   * Go to the application
   */
  goToApp() {
    return browser.url("app");
  }

  /**
   * Open url
   */
  openUrl(path) {
    return browser.url(`seleniumtests/${path}`);
  }

  /**
   * Switch to iframe
   */
  async switchToIframe(cssSelector) {
    // Switch to parent to avoid an issue on firefox
    await browser.switchToParentFrame();
    await $(cssSelector).waitForExist({ timeout: 15000 });
    const iframe = await $(cssSelector);
    await iframe.waitForClickable({ timeout: 15000 });
    await browser.switchToFrame(iframe);
  }
}

module.exports = new SeleniumPage();
