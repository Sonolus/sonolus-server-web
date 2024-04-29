<script setup lang="ts">
import { viewOptions } from '@/views/viewOptions'

defineOptions(
    viewOptions({
        title: () => '404',
        error: ({ i18n }) => i18n.notFound,
    }),
)
</script>
