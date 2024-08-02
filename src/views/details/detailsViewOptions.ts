import { paths } from '@/utils/item'
import { thumbnailUrls } from '@/utils/thumbnailUrl'
import type { ItemDetailsViewProps } from '@/views/details/ItemDetailsView.vue'
import { viewOptions } from '@/views/viewOptions'

export const detailsViewOptions = viewOptions<ItemDetailsViewProps>({
    url: ({ type, name }) => `/${paths[type]}/${name}`,
    loading: ({ i18n, props: { type } }) => i18n.clients.customServer[type].details.loading,
    error: ({ i18n, props: { type, name } }) => i18n.clients.customServer[type].details.error(name),

    title: ({ props: { name, data } }) => data?.item.title ?? name,
    banner: ({ type, data }) => data && thumbnailUrls[type](data.item as never),
})
