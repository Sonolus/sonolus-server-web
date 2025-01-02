import type { ItemMap } from '@/utils/item'
import type { ItemType, ServerItemDetails } from '@sonolus/core'

export type ItemDetailsViewProps<T extends ItemType = ItemType> = {
    type: T
    name: string
    data: ServerItemDetails<ItemMap[T]>
}
