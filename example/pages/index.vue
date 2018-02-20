<template>
  <div class="columns">
    <div class="column is-8">
      <section class="section">
        <div :class="'notification' + ' ' + 'is-success'">
          If the variable overwriting works, this notification has a lovely
          neon-green background.
        </div>
      </section>
    </div>

    <div class="column">
      <test-me />
    </div>
  </div>
</template>

<script>
import TestMe from '../components/TestMe'

export default {
  components: { TestMe }
}
</script>
