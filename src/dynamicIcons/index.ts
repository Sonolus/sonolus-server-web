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
import DynamicIconBackground from '@/dynamicIcons/DynamicIconBackground.vue'
import DynamicIconBell from '@/dynamicIcons/DynamicIconBell.vue'
import DynamicIconBellSlash from '@/dynamicIcons/DynamicIconBellSlash.vue'
import DynamicIconBookmark from '@/dynamicIcons/DynamicIconBookmark.vue'
import DynamicIconBookmarkHollow from '@/dynamicIcons/DynamicIconBookmarkHollow.vue'
import DynamicIconCheck from '@/dynamicIcons/DynamicIconCheck.vue'
import DynamicIconClock from '@/dynamicIcons/DynamicIconClock.vue'
import DynamicIconComment from '@/dynamicIcons/DynamicIconComment.vue'
import DynamicIconCrown from '@/dynamicIcons/DynamicIconCrown.vue'
import DynamicIconDelete from '@/dynamicIcons/DynamicIconDelete.vue'
import DynamicIconEdit from '@/dynamicIcons/DynamicIconEdit.vue'
import DynamicIconEffect from '@/dynamicIcons/DynamicIconEffect.vue'
import DynamicIconEngine from '@/dynamicIcons/DynamicIconEngine.vue'
import DynamicIconEnvelope from '@/dynamicIcons/DynamicIconEnvelope.vue'
import DynamicIconEnvelopeOpen from '@/dynamicIcons/DynamicIconEnvelopeOpen.vue'
import DynamicIconGlobe from '@/dynamicIcons/DynamicIconGlobe.vue'
import DynamicIconHeart from '@/dynamicIcons/DynamicIconHeart.vue'
import DynamicIconHeartHollow from '@/dynamicIcons/DynamicIconHeartHollow.vue'
import DynamicIconHide from '@/dynamicIcons/DynamicIconHide.vue'
import DynamicIconInformation from '@/dynamicIcons/DynamicIconInformation.vue'
import DynamicIconLevel from '@/dynamicIcons/DynamicIconLevel.vue'
import DynamicIconLock from '@/dynamicIcons/DynamicIconLock.vue'
import DynamicIconMedal from '@/dynamicIcons/DynamicIconMedal.vue'
import DynamicIconMessage from '@/dynamicIcons/DynamicIconMessage.vue'
import DynamicIconMinus from '@/dynamicIcons/DynamicIconMinus.vue'
import DynamicIconOptions from '@/dynamicIcons/DynamicIconOptions.vue'
import DynamicIconParticle from '@/dynamicIcons/DynamicIconParticle.vue'
import DynamicIconPin from '@/dynamicIcons/DynamicIconPin.vue'
import DynamicIconPlayer from '@/dynamicIcons/DynamicIconPlayer.vue'
import DynamicIconPlaylist from '@/dynamicIcons/DynamicIconPlaylist.vue'
import DynamicIconPlus from '@/dynamicIcons/DynamicIconPlus.vue'
import DynamicIconPost from '@/dynamicIcons/DynamicIconPost.vue'
import DynamicIconQuestion from '@/dynamicIcons/DynamicIconQuestion.vue'
import DynamicIconRanking from '@/dynamicIcons/DynamicIconRanking.vue'
import DynamicIconReplay from '@/dynamicIcons/DynamicIconReplay.vue'
import DynamicIconReply from '@/dynamicIcons/DynamicIconReply.vue'
import DynamicIconRestore from '@/dynamicIcons/DynamicIconRestore.vue'
import DynamicIconRoom from '@/dynamicIcons/DynamicIconRoom.vue'
import DynamicIconSearch from '@/dynamicIcons/DynamicIconSearch.vue'
import DynamicIconSettings from '@/dynamicIcons/DynamicIconSettings.vue'
import DynamicIconShow from '@/dynamicIcons/DynamicIconShow.vue'
import DynamicIconShuffle from '@/dynamicIcons/DynamicIconShuffle.vue'
import DynamicIconSkin from '@/dynamicIcons/DynamicIconSkin.vue'
import DynamicIconStar from '@/dynamicIcons/DynamicIconStar.vue'
import DynamicIconStarHalf from '@/dynamicIcons/DynamicIconStarHalf.vue'
import DynamicIconStarHollow from '@/dynamicIcons/DynamicIconStarHollow.vue'
import DynamicIconStopwatch from '@/dynamicIcons/DynamicIconStopwatch.vue'
import DynamicIconTag from '@/dynamicIcons/DynamicIconTag.vue'
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
    background: DynamicIconBackground,
    bell: DynamicIconBell,
    bellSlash: DynamicIconBellSlash,
    bookmark: DynamicIconBookmark,
    bookmarkHollow: DynamicIconBookmarkHollow,
    check: DynamicIconCheck,
    clock: DynamicIconClock,
    comment: DynamicIconComment,
    crown: DynamicIconCrown,
    delete: DynamicIconDelete,
    edit: DynamicIconEdit,
    effect: DynamicIconEffect,
    engine: DynamicIconEngine,
    envelope: DynamicIconEnvelope,
    envelopeOpen: DynamicIconEnvelopeOpen,
    globe: DynamicIconGlobe,
    heart: DynamicIconHeart,
    heartHollow: DynamicIconHeartHollow,
    hide: DynamicIconHide,
    information: DynamicIconInformation,
    level: DynamicIconLevel,
    lock: DynamicIconLock,
    medal: DynamicIconMedal,
    message: DynamicIconMessage,
    minus: DynamicIconMinus,
    options: DynamicIconOptions,
    particle: DynamicIconParticle,
    pin: DynamicIconPin,
    player: DynamicIconPlayer,
    playlist: DynamicIconPlaylist,
    plus: DynamicIconPlus,
    post: DynamicIconPost,
    question: DynamicIconQuestion,
    ranking: DynamicIconRanking,
    replay: DynamicIconReplay,
    reply: DynamicIconReply,
    restore: DynamicIconRestore,
    room: DynamicIconRoom,
    search: DynamicIconSearch,
    settings: DynamicIconSettings,
    show: DynamicIconShow,
    shuffle: DynamicIconShuffle,
    skin: DynamicIconSkin,
    star: DynamicIconStar,
    starHalf: DynamicIconStarHalf,
    starHollow: DynamicIconStarHollow,
    stopwatch: DynamicIconStopwatch,
    tag: DynamicIconTag,
    thumbsDown: DynamicIconThumbsDown,
    thumbsDownHollow: DynamicIconThumbsDownHollow,
    thumbsUp: DynamicIconThumbsUp,
    thumbsUpHollow: DynamicIconThumbsUpHollow,
    trophy: DynamicIconTrophy,
    unlock: DynamicIconUnlock,
    xMark: DynamicIconXMark,
} satisfies Record<Icon, Component>
