<template>
  <svg class="ic">
    <use :xlink:href="sprite" />
  </svg>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    icon: {
      type: String,
      default: 'close'
    }
  },

  computed: {
    sprite() {
      return require('@/assets/img/icons.svg') + `#${this.icon}`
    }
  }
}
</script>

<style lang="scss" scoped>
.ic {
  // Size
  @for $i from 10 through 30 {
    @if $i % 2 == 0 {
      &-#{$i} {
        width: #{$i}px;
        height: #{$i}px;
      }
    }
  }

  // Color
  &.black {
    fill: #000;
  }
  &.white {
    fill: #fff;
  }
  &.grey {
    fill: var(--grey-ed);
  }
  &.primary {
    fill: var(--primary);
  }
  &.secondary {
    fill: var(--secondary);
  }
  &.red {
    fill: var(--red);
  }
  &.yellow {
    fill: var(--yellow);
  }
  &.green {
    fill: var(--green);
  }
}
</style>
