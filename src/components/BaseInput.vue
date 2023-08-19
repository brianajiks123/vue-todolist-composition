<script setup>
// Communication from parents to children; props
defineProps({
  name: {
    type: String,
    default: 'name'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String, // value type; ex: String, Boolean, Array
    default: 'text', // default value
    validator: (value) => ['text', 'password'].includes(value) // accepted value
  },
  required: {
    type: Boolean,
    default: false
  }
})
// Communication from children to parents; emit
defineEmits(['update:modelValue'])
</script>

<template>
  <label :for="name">{{ name }}</label>
  <br />
  <input
    :id="name"
    class="input"
    type="type"
    :name="name"
    :placeholder="placeholder"
    :value="modelValue"
    :required="required"
    @input="(e) => $emit('update:modelValue', e.target.value)"
  />
</template>

<style scoped>
  .input {
    margin-block-end: 1rem;
    padding: 10px;
    font-size: 14px;
    width: 50%;
  }
</style>