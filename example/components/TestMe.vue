<template>
  <section class="section">
    <div :class="{ tabs: true }">
      <ul>
        <li
          :class="{
            'is-active': isActive
          }"
        >
          <a>Kewl</a>
        </li>
        <li><a>Stuff</a></li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data (){
    return {
      isActive: true
    }
  }
}
</script>
