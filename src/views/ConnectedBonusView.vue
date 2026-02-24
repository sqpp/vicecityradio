<template>
  <section
    class="h-full w-full flex flex-col relative text-white"
    style="
      font-family: Pricedown, sans-serif;
      text-shadow: -1px 0 #000, 1px 0 #000, 0 -1px #000, 0 2px #000;
      -webkit-font-smoothing: none;
    "
  >
    <!-- Background image: same as ConnecteD flow -->
    <img
      :src="connectedImageUrl"
      alt=""
      class="absolute inset-0 w-full h-full object-contain object-center pointer-events-none z-0"
      aria-hidden="true"
    />

    <div class="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
      <div class="max-w-[360px] w-full text-center">
        <p class="text-2xl mb-2">Disc Verified</p>
        <p class="text-md mb-2 leading-snug">
          You’ve unlocked the
          <span class="text-[#B43033]">{{ artistName }}</span>
          ConnecteD extras.
        </p>
        <p v-if="bonusMessage" class="text-xs mb-2 leading-snug">
          {{ bonusMessage }}
        </p>

        <p v-if="cheatCode" class="text-sm mb-4 leading-snug">
          Cheat code for this disc:<br />
          <span class="text-[#B43033]">{{ cheatCode }}</span>
        </p>

        <div v-if="bonusItems.length" class="mt-2 text-left text-md space-y-1">
          <div
            v-for="item in bonusItems"
            :key="item.id"
            class="flex items-center gap-2"
          >
            <span class="inline-flex w-4 justify-center text-xs">
              <i :class="iconClass(item.type)" aria-hidden="true"></i>
            </span>
            <a
              :href="item.url"
              target="_blank"
              rel="noopener"
              class="hover:opacity-80"
            >
              {{ item.text }}
            </a>
          </div>
        </div>

        <p v-else class="text-sm mt-4">
          No bonus content is configured for this station yet.
        </p>

        <p class="text-md mt-6">
          <RouterLink :to="connectedBackUrl" class="hover:opacity-80">
            back to ConnecteD
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentStation = computed(() => route.params.station?.toString() || "flash-fm");

const bonusMessage = ref("");
const artistName = ref("");
const cheatCode = ref("");
const bonusItems = ref([]);
const connectedImageUrl = "/images/connected.png";
const bonusSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/connected-check.mp3") : null;

if (bonusSound) {
  bonusSound.volume = 0.5;
  bonusSound.loop = true;
}

const configPaths = {
  "v-rock": "/connected/vrock/config.xml",
  "wave-103": "/connected/wave/config.xml",
  "emotion-983": "/connected/emotion/config.xml",
  "flash-fm": "/connected/flashfm/config.xml",
  "wildstyle": "/connected/wildstyle/config.xml",
  "fever-105": "/connected/fever/config.xml",
  "espantoso": "/connected/espantoso/config.xml",
};

const connectedBackUrl = computed(() => `/${currentStation.value}/connected`);

function iconClass(type) {
  switch (type) {
    case "videostream":
      return "fas fa-film";
    case "audiostream":
    case "bonustrack":
      return "fas fa-music";
    case "slideshow":
      return "fas fa-images";
    case "webpage":
    default:
      return "fas fa-download";
  }
}

function loadConfigForStation(stationKey) {
  bonusMessage.value = "";
  cheatCode.value = "";
  bonusItems.value = [];

  const path = configPaths[stationKey];
  if (!path) return;

  fetch(path)
    .then((res) => res.text())
    .then((text) => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      const attrNode = xml.querySelector("dataList > entry[id='!ATTRIBUTES']");
      if (attrNode) {
        const bonus = attrNode.getAttribute("bonusmessage");
        const cheat = attrNode.getAttribute("cheatcode");
        const artist = attrNode.getAttribute("artistname");
        // If bonus line duplicates the hard-coded 'You’ve unlocked...' header, drop it
        if (bonus && !bonus.startsWith("You’ve unlocked")) {
          bonusMessage.value = bonus;
        }
        if (cheat) cheatCode.value = cheat;
        if (artist) artistName.value = artist;
      }

      const entryNodes = Array.from(
        xml.querySelectorAll("dataList > entry[id]:not([id='!ATTRIBUTES'])"),
      );
      bonusItems.value = entryNodes.map((node) => ({
        id: node.getAttribute("id") || "",
        type: node.getAttribute("type") || "webpage",
        text: node.getAttribute("text") || "",
        url: node.getAttribute("url") || "#",
        fontsize: node.getAttribute("fontsize") || "14",
      }));
    })
    .catch(() => {
      bonusItems.value = [];
    });
}

// Load once on mount, and any time the :station route param changes
onMounted(() => {
  loadConfigForStation(currentStation.value);

  if (bonusSound) {
    try {
      bonusSound.currentTime = 0;
      void bonusSound.play();
    } catch (e) {
      // ignore autoplay errors
    }
  }
});

watch(
  () => currentStation.value,
  (newStation, oldStation) => {
    if (newStation && newStation !== oldStation) {
      loadConfigForStation(newStation);
    }
  },
);

onUnmounted(() => {
  if (bonusSound) {
    bonusSound.pause();
    bonusSound.currentTime = 0;
  }
});
</script>

