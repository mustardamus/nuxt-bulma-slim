module.exports = `
  <div class="container">
    <div class='columns'>
      <div :class="'column ' + columnNum">
        <a
          id="link"
          :class="{
            button: true,
            'is-info': isInfo
          }"
        >
          Link
        </a>
      </div>

      <div class="column">
        <div :class='{ notification: true, "is-active": isActive }'>
          Right
        </div>
      </div>
    </div>
  </div>
`
