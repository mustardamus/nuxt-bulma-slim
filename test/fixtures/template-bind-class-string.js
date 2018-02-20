module.exports = `
  <div :class="'container ' + var + ' is-fluid'">
    <div :class='"columns" + " " + var'>
      <div :class="'column'">
        <a
          id="link"
          :class="'button' + ' ' + var + ' ' + 'is-primary'"
        />
          Link
        </a>
      </div>
    </div>
  </div>
`
