<script setup lang="ts">
interface Props {
  direction?: 'col' | 'row';
  gap?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'col',
  gap: 'md',
  fullWidth: false,
});

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-5',
};
</script>

<template>
  <div
    :class="[
      'flex',
      direction === 'col' ? 'flex-col' : 'flex-row',
      gapClasses[gap],
      fullWidth && 'w-full'
    ]"
  >
    <slot />
  </div>
</template>
