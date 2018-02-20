module.exports = `
  <div :class="{container:true}">
    <div :class="{ columns: 1 }">
      <div :class='{ column: true, "is-8": true }'>
        <a
          id="link"
          :class="{
            button: true,
            'is-fullwidth': isFullWidth
          }"
        >
          Link
        </a>
      </div>

      <div :class='
        {
          column: true,
          'is-4': true
        }
      '>
        Right
      </div>
    </div>
  </div>
`
