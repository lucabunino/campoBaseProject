import { CogIcon } from '@sanity/icons'
import {HomeIcon, DocumentTextIcon, TagsIcon} from '@sanity/icons'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const myStructure = (S, context) => {
  const topListItems = [
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
  const bottomListItems = S.documentTypeListItems().filter(listItem => {
    const includedDocumentTypes = ['seo', 'homepage', 'about', 'format'];
    return !includedDocumentTypes.includes(listItem.getId());
  });

  const formatListItem = S.listItem()
    .title('Formats')
    .icon(TagsIcon)
    .child(
      S.list()
        .title('Formats')
        .items([
          orderableDocumentListDeskItem({
            type: 'format',
            title: 'Formats',
            icon: TagsIcon,
            S,
            context,
          }),
        ])
    );

  return S.list()
    .title('Content')
    .items([
      ...topListItems,
      ...bottomListItems,
      orderableDocumentListDeskItem({
        type: 'format',
        title: 'Formats',
        icon: TagsIcon,
        S,
        context,
      }),
      ...customListItems,
    ]);
};