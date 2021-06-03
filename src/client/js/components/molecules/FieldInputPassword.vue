<template>
<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">{{ label }}</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control has-icons-left has-icons-right">
        <b-input
          type="password"
          v-model="inputValue"
          :class="{'is-danger': errorMsg}"
          :password-reveal="true"
          @blur="emitBlur"
          icon="lock"
          icon-pack="fas"
        ></b-input>
      </div>
      <p class="help is-danger" v-if="errorMsg">{{ errorMsg }}</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  nane: 'FieldInputPassword',

  props: {
    label: {
      type: String,
      default: '',
    },

    value: {
      type: String,
      default: '',
      required: true,
    },

    errorMsg: {
      type: String,
      default: '',
    },
  },

  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    },
  },

  created() {
  },

  methods: {
    emitBlur() {
      this.$emit('blur', this.inputValue)
    },
  },
}
</script>

