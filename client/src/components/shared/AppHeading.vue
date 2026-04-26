<script setup lang="ts">
interface Props {
  level?: 1 | 2 | 3 | 4;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  text: '',
});

const sizeClasses = {
  1: 'text-3xl',
  2: 'text-2xl',
  3: 'text-xl',
  4: 'text-lg',
};
</script>

<template>
  <component
    :is="`h${level}`"
    :class="[sizeClasses[level], 'text-accent font-bold']"
  >
    <slot>{{ text }}</slot>
  </component>
</template>
