import DynamicIconAdvanced from '@/dynamicIcons/DynamicIconAdvanced.vue'
import DynamicIconAngleDown from '@/dynamicIcons/DynamicIconAngleDown.vue'
import DynamicIconAngleLeft from '@/dynamicIcons/DynamicIconAngleLeft.vue'
import DynamicIconAngleRight from '@/dynamicIcons/DynamicIconAngleRight.vue'
import DynamicIconAnglesDown from '@/dynamicIcons/DynamicIconAnglesDown.vue'
import DynamicIconAnglesLeft from '@/dynamicIcons/DynamicIconAnglesLeft.vue'
import DynamicIconAnglesRight from '@/dynamicIcons/DynamicIconAnglesRight.vue'
import DynamicIconAnglesUp from '@/dynamicIcons/DynamicIconAnglesUp.vue'
import DynamicIconAngleUp from '@/dynamicIcons/DynamicIconAngleUp.vue'
import DynamicIconArrowDown from '@/dynamicIcons/DynamicIconArrowDown.vue'
import DynamicIconArrowLeft from '@/dynamicIcons/DynamicIconArrowLeft.vue'
import DynamicIconArrowRight from '@/dynamicIcons/DynamicIconArrowRight.vue'
import DynamicIconArrowUp from '@/dynamicIcons/DynamicIconArrowUp.vue'
import DynamicIconAward from '@/dynamicIcons/DynamicIconAward.vue'
import DynamicIconBookmark from '@/dynamicIcons/DynamicIconBookmark.vue'
import DynamicIconBookmarkHollow from '@/dynamicIcons/DynamicIconBookmarkHollow.vue'
import DynamicIconCheck from '@/dynamicIcons/DynamicIconCheck.vue'
import DynamicIconComment from '@/dynamicIcons/DynamicIconComment.vue'
import DynamicIconCrown from '@/dynamicIcons/DynamicIconCrown.vue'
import DynamicIconDelete from '@/dynamicIcons/DynamicIconDelete.vue'
import DynamicIconEdit from '@/dynamicIcons/DynamicIconEdit.vue'
import DynamicIconHeart from '@/dynamicIcons/DynamicIconHeart.vue'
import DynamicIconHeartHollow from '@/dynamicIcons/DynamicIconHeartHollow.vue'
import DynamicIconHide from '@/dynamicIcons/DynamicIconHide.vue'
import DynamicIconLock from '@/dynamicIcons/DynamicIconLock.vue'
import DynamicIconMedal from '@/dynamicIcons/DynamicIconMedal.vue'
import DynamicIconMinus from '@/dynamicIcons/DynamicIconMinus.vue'
import DynamicIconOptions from '@/dynamicIcons/DynamicIconOptions.vue'
import DynamicIconPlus from '@/dynamicIcons/DynamicIconPlus.vue'
import DynamicIconRanking from '@/dynamicIcons/DynamicIconRanking.vue'
import DynamicIconReply from '@/dynamicIcons/DynamicIconReply.vue'
import DynamicIconSearch from '@/dynamicIcons/DynamicIconSearch.vue'
import DynamicIconSettings from '@/dynamicIcons/DynamicIconSettings.vue'
import DynamicIconShow from '@/dynamicIcons/DynamicIconShow.vue'
import DynamicIconShuffle from '@/dynamicIcons/DynamicIconShuffle.vue'
import DynamicIconStar from '@/dynamicIcons/DynamicIconStar.vue'
import DynamicIconStarHalf from '@/dynamicIcons/DynamicIconStarHalf.vue'
import DynamicIconStarHollow from '@/dynamicIcons/DynamicIconStarHollow.vue'
import DynamicIconThumbsDown from '@/dynamicIcons/DynamicIconThumbsDown.vue'
import DynamicIconThumbsDownHollow from '@/dynamicIcons/DynamicIconThumbsDownHollow.vue'
import DynamicIconThumbsUp from '@/dynamicIcons/DynamicIconThumbsUp.vue'
import DynamicIconThumbsUpHollow from '@/dynamicIcons/DynamicIconThumbsUpHollow.vue'
import DynamicIconTrophy from '@/dynamicIcons/DynamicIconTrophy.vue'
import DynamicIconUnlock from '@/dynamicIcons/DynamicIconUnlock.vue'
import DynamicIconXMark from '@/dynamicIcons/DynamicIconXMark.vue'
import type { Icon } from '@sonolus/core'
import type { Component } from 'vue'

export const dynamicIcons: Record<string, Component> = {
    advanced: DynamicIconAdvanced,
    angleDown: DynamicIconAngleDown,
    angleLeft: DynamicIconAngleLeft,
    angleRight: DynamicIconAngleRight,
    anglesDown: DynamicIconAnglesDown,
    anglesLeft: DynamicIconAnglesLeft,
    anglesRight: DynamicIconAnglesRight,
    anglesUp: DynamicIconAnglesUp,
    angleUp: DynamicIconAngleUp,
    arrowDown: DynamicIconArrowDown,
    arrowLeft: DynamicIconArrowLeft,
    arrowRight: DynamicIconArrowRight,
    arrowUp: DynamicIconArrowUp,
    award: DynamicIconAward,
    bookmark: DynamicIconBookmark,
    bookmarkHollow: DynamicIconBookmarkHollow,
    check: DynamicIconCheck,
    comment: DynamicIconComment,
    crown: DynamicIconCrown,
    delete: DynamicIconDelete,
    edit: DynamicIconEdit,
    heart: DynamicIconHeart,
    heartHollow: DynamicIconHeartHollow,
    hide: DynamicIconHide,
    lock: DynamicIconLock,
    medal: DynamicIconMedal,
    minus: DynamicIconMinus,
    options: DynamicIconOptions,
    plus: DynamicIconPlus,
    ranking: DynamicIconRanking,
    reply: DynamicIconReply,
    search: DynamicIconSearch,
    settings: DynamicIconSettings,
    show: DynamicIconShow,
    shuffle: DynamicIconShuffle,
    star: DynamicIconStar,
    starHalf: DynamicIconStarHalf,
    starHollow: DynamicIconStarHollow,
    thumbsDown: DynamicIconThumbsDown,
    thumbsDownHollow: DynamicIconThumbsDownHollow,
    thumbsUp: DynamicIconThumbsUp,
    thumbsUpHollow: DynamicIconThumbsUpHollow,
    trophy: DynamicIconTrophy,
    unlock: DynamicIconUnlock,
    xMark: DynamicIconXMark,
} satisfies Record<Icon, Component>
