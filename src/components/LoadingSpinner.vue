<template>
    <div class="relative">
        <div
            class="spinner absolute left-0 top-0 h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '-0.25s' }"
        />
        <div
            class="spinner absolute left-[37.5%] top-0 h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '-0.125s' }"
        />
        <div
            class="spinner absolute left-3/4 top-0 h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '0s' }"
        />
        <div
            class="spinner absolute left-0 top-[37.5%] h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '-0.375s' }"
        />
        <div
            class="spinner absolute left-3/4 top-[37.5%] h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '-0.875s' }"
        />
        <div
            class="spinner absolute left-0 top-3/4 h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '-0.5s' }"
        />
        <div
            class="spinner absolute left-[37.5%] top-3/4 h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '-0.625s' }"
        />
        <div
            class="spinner absolute left-3/4 top-3/4 h-1/4 w-1/4 bg-sonolus-ui-text-normal"
            :style="{ 'animation-delay': '-0.75s' }"
        />
    </div>
</template>

<style scoped>
.spinner {
    animation-name: spinner;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

@keyframes spinner {
    from {
        transform: scale(1);
        opacity: 1;
    }

    to {
        transform: scale(0.5);
        opacity: 0;
    }
}
</style>
