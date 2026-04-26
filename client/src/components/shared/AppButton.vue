<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variantClasses = {
  primary: 'bg-accent text-container hover:scale-102 transition-all ease-in duration-200',
  secondary: 'border-2 border-accent text-accent hover:bg-container/40 transition-all ease-in duration-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 transition-all ease-in duration-200',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-sm',
  md: 'px-5 py-2 text-sm rounded-sm',
  lg: 'px-6 py-2.5 text-base rounded-sm',
};

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      variantClasses[variant],
      sizeClasses[size],
      'font-bold flex items-center justify-center gap-2',
      (disabled || loading) && 'opacity-50 cursor-not-allowed hover:scale-100'
    ]"
    @click="handleClick"
  >
    <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
    <slot />
  </button>
</template>
