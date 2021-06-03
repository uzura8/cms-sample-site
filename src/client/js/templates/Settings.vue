<template>
<div>
  <h1 class="title">{{ $t('page.Settings') }}</h1>
  <eb-settings-container></eb-settings-container>
</div>
</template>

<script>
import EbSettingsContainer from '@/components/organisms/EbSettingsContainer'

export default{
  components: {
    EbSettingsContainer,
  },

  data(){
    return {
    }
  },

  computed: {
  },

  created() {
  },

  methods: {
  },
}
</script>
