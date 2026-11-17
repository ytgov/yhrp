<template>
  <!-- Renders plain text, turning any http(s) URLs into links. Builds real
       text and <a> nodes rather than using v-html, so register data can never
       inject markup. -->
  <span>
    <template v-for="(part, i) in parts" :key="i">
      <a
        v-if="part.url"
        :href="part.url"
        target="_blank"
        rel="noopener noreferrer"
      >{{ part.text }}</a>
      <template v-else>{{ part.text }}</template>
    </template>
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});

const URL_PATTERN = /https?:\/\/[^\s<>"]+/g;
// Sentence punctuation that commonly follows a URL but isn't part of it.
const TRAILING_PUNCTUATION = /[.,;:!?)\]]+$/;

const parts = computed(() => {
  const text = props.text || "";
  const result = [];
  let lastIndex = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    const trailing = match[0].match(TRAILING_PUNCTUATION)?.[0] || "";
    const url = match[0].slice(0, match[0].length - trailing.length);
    const end = match.index + url.length;

    if (match.index > lastIndex) {
      result.push({ text: text.slice(lastIndex, match.index) });
    }
    result.push({ text: url, url });
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex) });
  }

  return result;
});
</script>
