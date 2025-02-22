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

const DisplayNotificationPage = require("../../Common/Notification/DisplayNotification.page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DeleteResourcePage {
  /**
   * define selectors using getter methods
   */
  get deletePasswordPage() {
    return $('.delete-password-dialog.dialog-wrapper');
  }

  get submitButton() {
    return $('button[type=submit]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to delete a password
   */
  async deletePassword() {
    await this.deletePasswordPage.waitForExist();
    await this.submitButton.waitForClickable();
    await this.submitButton.click();
    await DisplayNotificationPage.successNotification.waitForExist();
  }
}

module.exports = new DeleteResourcePage();
