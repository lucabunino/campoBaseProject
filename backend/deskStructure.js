import { CogIcon } from '@sanity/icons'
import {HomeIcon} from '@sanity/icons'
import {DocumentTextIcon} from '@sanity/icons'

export const myStructure = (S) => {
  const pages = [
    S.listItem()
      .title('Homepage')
      .icon(HomeIcon)
      .child(S.document().schemaType('homepage').documentId('homepage')),
    S.listItem()
      .title('About')
      .icon(DocumentTextIcon)
      .child(S.document().schemaType('about').documentId('about')),
    S.divider(),
  ];
  const customListItems = [
    S.divider(),
    S.listItem()
      .title('SEO')
      .icon(CogIcon)
      .child(S.document().schemaType('seo').documentId('seo')),
  ];

  // Filter out document types that are already included in customListItems
  const otherListItems = S.documentTypeListItems().filter(listItem => {
    const includedDocumentTypes = ['seo', 'homepage', 'about'];
    return !includedDocumentTypes.includes(listItem.getId());
  });

  return S.list()
    .title('Content')
    .items([
      ...pages,
      ...otherListItems,
      ...customListItems,
    ]);
};