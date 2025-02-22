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

const {adaPrivateKey, adminPrivateKey} = require('../../page/Authentication/ImportGpgKey/ImportGpgKey.data');
const SeleniumPage = require('../../page/Selenium/Selenium.page');
const RecoverAuthenticationPage = require('../../page/AuthenticationRecover/RecoverAUthentication/RecoverAuthentication.page');
const ShareDialogPage = require('../../page/Share/ShareDialog.page');
const DisplayMainMenuPage = require('../../page/Common/Menu/DisplayMainMenu.page');
const DisplayResourcesWorkspacePage = require('../../page/Resource/DisplayResourcesWorkspace/DisplayResourcesWorkspace.page');
const DisplayResourcesListPage = require('../../page/Resource/DisplayResourcesList/DisplayResourcesList.page');
const DisplayResourceDetailsPage = require('../../page/ResourceDetails/DisplayResourceDetails/DisplayResourceDetails.page');
const DisplayResourceFolderDetailsPage = require('../../page/ResourceFolderDetails/DisplayResourceFolderDetails/DisplayResourceFolderDetails.page');
const FilterResourcesByFoldersPage = require('../../page/Resource/FilterResourcesByFolders/FilterResourcesByFolders.page');
const FilterResourcesByTextPage = require('../../page/Resource/FilterResourcesByText/FilterResourcesByText.page');
const CreateResourcePage = require('../../page/Resource/CreateResource/CreateResource.page');
const CreateResourceFolderPage = require('../../page/ResourceFolder/CreateResourceFolder/CreateResourceFolder.page');
const RenameResourceFolderPage = require('../../page/ResourceFolder/RenameResourceFolder/RenameResourceFolder.page');
const DeleteResourceFolderPage = require('../../page/ResourceFolder/DeleteResourceFolder/DeleteResourceFolder.page');
const FilterResourcesByShortcutsPage = require('../../page/Resource/FilterResourcesByShortcuts/FilterResourcesByShortcuts.page');
const {templates} = require('../../../../lib/emailTemplates');

describe('password workspace', () => {
  // WARNING : execution order is very important

  after(async () => {
    // runs once after the last test in this block
    await SeleniumPage.resetInstanceDefault()
  });

  it('As LU I should recover ada account', async() => {
    await RecoverAuthenticationPage.recover('ada@cipherguard.com', adaPrivateKey);
    await DisplayMainMenuPage.switchAppIframe();
  });

  it('As LU I should create a new folder', async() => {
    await DisplayResourcesWorkspacePage.openCreateFolder();
    await CreateResourceFolderPage.createFolder('folderParent');
  });

  it('When a folder is created, notify its creator.', async() => {
    await SeleniumPage.checkSubjectContent("ada@cipherguard.com", "You have created a new folder", templates.folder.LU.created);
    await SeleniumPage.clickOnRedirection();
    await DisplayMainMenuPage.switchAppIframe();
  })

  it('As LU I should create a new password', async() => {
    await DisplayResourcesWorkspacePage.openCreatePassword();
    await CreateResourcePage.createPassword('nameA', 'uri', 'ada@cipherguard.com', 'RSS5j8AQrmZK3mAQqx', 'description');
  });

  it('As LU I should create a subfolder folder', async() => {
    await FilterResourcesByFoldersPage.selectedFolderNamed('folderParent');
    await DisplayResourcesWorkspacePage.openCreateFolder();
    await CreateResourceFolderPage.createFolder('folderChild');
  });

  it('As LU I should create a new password', async() => {
    await DisplayResourcesWorkspacePage.openCreatePassword();
    await CreateResourcePage.createPassword('nameB', 'uri', 'ada@cipherguard.com', 'RSS5j8AQrmZK3mAQqx', 'description');
  });

  it('As LU I should share a password', async() => {
    await DisplayResourceDetailsPage.openShareResource();
    await ShareDialogPage.shareResource('admin@cipherguard.com', 'ada@cipherguard.com');
  });

  it('As LU I should share a folder with a group', async() => {
    await FilterResourcesByFoldersPage.selectedFolderNamed('folderParent');
    await DisplayResourceFolderDetailsPage.openShareResource();
    await ShareDialogPage.shareResource('Accounting', 'ada@cipherguard.com');
  });

  it('As LU I should share a folder with a user', async() => {
    await FilterResourcesByFoldersPage.selectedFolderNamed('folderParent');
    await DisplayResourceFolderDetailsPage.openShareResource();
    await ShareDialogPage.shareResource('admin@cipherguard.com', 'ada@cipherguard.com');
  });

  it('As LU I should see my passwords share with admin user and accounting group', async() => {
    await DisplayResourcesListPage.selectedResourceNamed('nameA');
    await DisplayResourceDetailsPage.openShareSection();
    await DisplayResourceDetailsPage.getShareWithExist('Accounting');
    await FilterResourcesByFoldersPage.selectedFolderNamed('folderChild');
    await DisplayResourcesListPage.selectedResourceNamed('nameB');
    await DisplayResourceDetailsPage.openShareSection();
    await DisplayResourceDetailsPage.getShareWithExist('Admin User (admin@cipherguard.com)');
    await DisplayResourceDetailsPage.getShareWithExist('Accounting');
  });

  it('When a folder is shared, notify the users who gain access to it', async() => {
    await SeleniumPage.checkSubjectContent("admin@cipherguard.com", "Ada shared a folder with you", templates.folder.LU.shared)
    await SeleniumPage.clickOnRedirection();
    await DisplayMainMenuPage.switchAppIframe();
  });

  it('As LU I should recover admin account', async() => {
    await RecoverAuthenticationPage.recover('admin@cipherguard.com', adminPrivateKey);
    await DisplayMainMenuPage.switchAppIframe();
  });

  it('As LU I should filter my resource by shared with me', async() => {
    await FilterResourcesByShortcutsPage.filterBySharedWithMe();
    await DisplayResourcesListPage.selectedResourceNamed('nameB');
  });

  it('As LU I should copy the secret of my password', async() => {
    await DisplayResourcesListPage.copySecretResource('admin@cipherguard.com');
    await FilterResourcesByTextPage.pasteClipBoardToVerify('secretB');
  });

  it('As LU I should rename a folder', async() => {
    await FilterResourcesByFoldersPage.openRenameResourceFolder();
    await RenameResourceFolderPage.renameFolder('rename');
  });

  it('When a folder is updated, notify the users who have access to it.', async() => {
    await SeleniumPage.checkSubjectContent("ada@cipherguard.com", "Admin edited a folder", templates.folder.LU.updated)
    await SeleniumPage.clickOnRedirection();
    await DisplayMainMenuPage.switchAppIframe();
  })

  it('As LU I should delete a folder', async() => {
    await FilterResourcesByFoldersPage.openDeleteResourceFolder();
    await DeleteResourceFolderPage.deleteFolder();
  });
  
  it('When a folder is deleted, notify the users who had access to it.', async() => {
    await SeleniumPage.checkSubjectContent("ada@cipherguard.com", "Admin deleted a folder", templates.folder.LU.deleted)
    await SeleniumPage.clickOnRedirection();
    await DisplayMainMenuPage.switchAppIframe();
  })
});
