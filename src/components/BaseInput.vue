<script setup>
// Communication from parents to children; props
defineProps({
  id: {
    type: String,
    default: 'id'
  },
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
  required: {
    type: Boolean,
    default: false
  }
})
// Communication from children to parents; emit
defineEmits(['update:modelValue'])
</script>

<template>
  <label :for="id">{{ name }}</label>
  <br />
  <input
    :id="id"
    class="input"
    type="text"
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