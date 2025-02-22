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

const SeleniumPage = require("../../Selenium/Selenium.page");
const CheckPassphrasePage = require("../CheckPasphrase/CheckPassphrase.page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
  /**
   * return the form container for login
   */
  get loginForm() {
    return $("login-form");
  }

  /**
   * return the form container for initiate recover account form
   */
  get initiateRecoverAccountForm() {
    return $(".initiate-recover-account");
  }
  /**
   * return the login iframe
   */
  get iframeSelector() {
    return "#cipherguard-iframe-login";
  }

  /**
   * return the submit button
   */
  get btnSubmit() {
    return $('button[type="submit"]');
  }

  /**
   * return the lost private key link
   */
  get lostMyPrivateKeyLink() {
    return $(".form-actions button[type=\"button\"]");
  }

  get requestRecoverAccountButton() {
    return $(".form-actions button.primary");
  }

  /**
   * Go to the url
   */
  goToLogin() {
    return browser.url("auth/login");
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to import gpg key
   */
  async login(passphrase) {
    await SeleniumPage.switchToIframe(this.iframeSelector);
    await CheckPassphrasePage.enterPassphrase(passphrase);
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. click on lost private key link to redirect to form
   */
  async clickOnLostPrivateKeyLink() {
    await SeleniumPage.switchToIframe(this.iframeSelector);
    await this.lostMyPrivateKeyLink.waitForClickable();
    await this.lostMyPrivateKeyLink.click();
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. click on lost private key link to redirect to form
   */
  async clickOnRecoverAccountButton() {
    await this.initiateRecoverAccountForm.waitForExist();
    await this.requestRecoverAccountButton.click();
  }
}

module.exports = new LoginPage();
