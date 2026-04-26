<script setup lang="ts">
interface Props {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  hoverable: false,
  padding: 'md',
});

const paddingClasses = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};
</script>

<template>
  <div
    :class="[
      'border-2 border-accent rounded-lg bg-container',
      paddingClasses[padding],
      hoverable && 'hover:scale-102 transition-all ease-in duration-200'
    ]"
  >
    <slot />
  </div>
</template>
