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
class InputPassphrasePage {
  /**
   * define selectors using getter methods
   */
  get entryPassphrasePage() {
    return $('.dialog-wrapper.passphrase-entry');
  }

  get inputPassphrase() {
    return $('#passphrase-entry-form-passphrase');
  }

  get btnSubmit() {
    return $('.dialog-wrapper.passphrase-entry button[type="submit"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to entry passphrase
   */
  async entryPassphrase(username) {
    // Entry passphrase
    await this.entryPassphrasePage.waitForExist(({timeout: 15000}));
    await this.inputPassphrase.setValue(username);
    await this.btnSubmit.waitForClickable();
    await this.btnSubmit.click();
  }
}

module.exports = new InputPassphrasePage();
