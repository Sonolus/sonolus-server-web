import DynamicIconAdvanced from '@/dynamicIcons/DynamicIconAdvanced.vue'
import DynamicIconAward from '@/dynamicIcons/DynamicIconAward.vue'
import DynamicIconBookmark from '@/dynamicIcons/DynamicIconBookmark.vue'
import DynamicIconCrown from '@/dynamicIcons/DynamicIconCrown.vue'
import DynamicIconHeart from '@/dynamicIcons/DynamicIconHeart.vue'
import DynamicIconMedal from '@/dynamicIcons/DynamicIconMedal.vue'
import DynamicIconRanking from '@/dynamicIcons/DynamicIconRanking.vue'
import DynamicIconSearch from '@/dynamicIcons/DynamicIconSearch.vue'
import DynamicIconShuffle from '@/dynamicIcons/DynamicIconShuffle.vue'
import DynamicIconStar from '@/dynamicIcons/DynamicIconStar.vue'
import DynamicIconThumbsDown from '@/dynamicIcons/DynamicIconThumbsDown.vue'
import DynamicIconThumbsUp from '@/dynamicIcons/DynamicIconThumbsUp.vue'
import DynamicIconTrophy from '@/dynamicIcons/DynamicIconTrophy.vue'
import type { Icon } from '@sonolus/core'
import type { Component } from 'vue'

export const dynamicIcons: Record<string, Component> = {
    advanced: DynamicIconAdvanced,
    award: DynamicIconAward,
    bookmark: DynamicIconBookmark,
    crown: DynamicIconCrown,
    heart: DynamicIconHeart,
    medal: DynamicIconMedal,
    ranking: DynamicIconRanking,
    search: DynamicIconSearch,
    shuffle: DynamicIconShuffle,
    star: DynamicIconStar,
    thumbsDown: DynamicIconThumbsDown,
    thumbsUp: DynamicIconThumbsUp,
    trophy: DynamicIconTrophy,
} satisfies Record<Icon, Component>
