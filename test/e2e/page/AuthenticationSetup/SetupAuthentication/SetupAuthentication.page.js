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

const SeleniumPage = require('../../Selenium/Selenium.page');
const CreateGpgKeyPage = require('../../Authentication/CreateGpgKey/CreateGpgKey.page');
const DownloadRecoveryKit = require('../../Authentication/DownloadRecoveryKit/DownloadRecoveryKit.page');
const ChooseSecurityTokenPage = require('../../Authentication/ChooseSecurityToken/ChooseSecurityToken.page');
const {templates} = require('../../../../../lib/emailTemplates');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SetupAuthenticationPage {
  /**
   * define selectors using getter methods
   */
  get container() {
    return $('#container');
  }

  get iframeSelector() {
    return '#cipherguard-iframe-setup';
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to setup using username and password
   */
  async setup(username) {
    await this.container.waitForExist();
    // Show last email and redirect for account setup
    await SeleniumPage.showLastEmailAndRedirect(username, templates.register.AN.registered);
    // Go to iframe setup setup
    await SeleniumPage.switchToIframe(this.iframeSelector);

    // Choose passphrase
    await CreateGpgKeyPage.choosePassphrase(username);

    // Generate key
    await DownloadRecoveryKit.generateGpgKey();

    // Choose security token
    await ChooseSecurityTokenPage.chooseSecurityToken();
  }
}

module.exports = new SetupAuthenticationPage();
