<script setup lang="ts">
interface Props {
  modelValue: string | number;
  type?: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  label?: string;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
  label: '',
  error: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value: string | number = target.value;
  if (props.type === 'number') {
    value = value === '' ? '' : Number(value);
  }
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="text-accent text-sm font-medium">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :min="min"
      :max="max"
      :class="[
        'border border-accent placeholder:text-accent/30 focus:text-accent rounded-sm outline-none focus:border-2 focus:border-accent px-3 py-2 bg-container',
        error && 'border-red-500 focus:border-red-500'
      ]"
      @input="handleInput"
    />
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>
