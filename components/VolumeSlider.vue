<script setup>
/* eslint-disable no-undef */
defineProps({
  // Slider value.
  modelValue: {
    type: Number,
    required: true
  },
  legened: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="slider">
    <span class="slider-text">
      {{ legened }}
    </span>
    <span class="slider-markers">
      <svg
        v-for="n in 8 - modelValue"
        :key="n"
        class="marker"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 0 18 16"
        @mousedown.left="$emit('update:modelValue', 9 - n)"
      >
        <rect
          class="marker-marker"
          x="3.55"
          y="3.55"
          width="8.9"
          height="8.9"
          transform="translate(-3.31 8) rotate(-45)"
        />
        <path
          class="marker-stroke"
          d="M8,2.41,13.59,8,8,13.59,2.41,8,8,2.41M8,1,1,8l7,7,7-7L8,1Z"
        />
      </svg>

      <svg
        v-for="n in modelValue"
        :key="n"
        class="marker"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 0 18 16"
        @mousedown.left="$emit('update:modelValue', n == 1 ? 0 : modelValue + 1 - n)"
      >
        <rect
          class="marker-stroke"
          x="3.55"
          y="3.55"
          width="8.9"
          height="8.9"
          transform="translate(-3.31 8) rotate(-45)"
        />
        <path
          class="marker-stroke"
          d="M8,2.41,13.59,8,8,13.59,2.41,8,8,2.41M8,1,1,8l7,7,7-7L8,1Z"
        />
      </svg>
    </span>
  </div>
</template>

<style lang="scss">
.slider {
  display: flex;
  gap: var(--space-8);

  &-text {
    font-size: var(--type-size-2);
    text-align: right;
    flex-grow: 1;
  }

  &-markers {
    display: inline-flex;

    /* This is a trick to make the General Sibling Combinator
       match *previous* sibling elements, instead of following ones.
       Source: https://medium.com/free-code-camp/how-to-make-the-impossible-possible-in-css-with-a-little-creativity-bd96bb42b29d#3041
    */
    flex-direction: row-reverse;
  }
}

.marker {
  --marker-hover: 0;

  cursor: pointer;
  height: 1.5rem;

  &:hover,
  &:hover ~ & {
    --marker-hover: 1;
  }

  &-marker {
    fill: hsl(0deg 0% 44% / calc(var(--marker-hover) * 100%));
  }

  &-stroke {
    fill: hsl(0deg 0% 44%);
  }
}
</style>
