<template>
  <!-- ConnecteD flow: match right-image row (450px) + footer (~78px) height, no nav/footer UI -->
  <div v-if="isConnectedViewPage" class="min-h-screen bg-slate-900 flex items-center justify-center">
    <!-- 450px (content row) + ~78px (footer stack) ≈ 528px total -->
    <div class="w-full max-w-[790px] h-[528px] text-white shadow-2xl overflow-hidden bg-black flex flex-col">
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>

  <!-- Normal layout: nav, content, right column, footer -->
  <div v-else class="min-h-screen bg-slate-900 flex items-center justify-center">
    <div class="w-full max-w-[790px] text-white shadow-2xl overflow-hidden bg-white">
      <!-- 450px content row: left column (menu + text) | right column (art only) -->
      <div class="flex h-[450px]">
        <!-- Left column only: top bar + scrollable content (menu does not go over right section) -->
        <div class="flex flex-1 min-w-0 flex-col">
          <!-- Top menu bar: left half only -->
          <header class="flex flex-shrink-0 flex-col text-[11px]">
            <!-- \"NEWS  STORE\" row: text color matches station bg -->
            <div
              class="flex gap-4 px-4 pt-12.5 pb-1 uppercase font-bold  bg-white text-base"
              :style="{ color: stationStyle.bg, fontFamily: 'Pricedown, sans-serif' }"
            >
              <span>news</span>
              <span>store</span>
            </div>
            <!-- DJ INFO / PLAYLIST / ConnecteD row: links to current station's pages -->
            <nav
              class="flex items-center gap-6 px-4 text-[14px] uppercase tracking-[0.1em] h-[18px] bg-black text-white"
            >
              <RouterLink :to="`/${currentStation}`" class="no-underline" :class="navLinkClass('dj')">DJ INFO</RouterLink>
              <RouterLink :to="`/${currentStation}/playlist`" class="no-underline" :class="navLinkClass('playlist')">PLAYLIST</RouterLink>
              <RouterLink :to="`/${currentStation}/connected`" class="no-underline" :class="navLinkClass('connected')">ConnecteD</RouterLink>
            </nav>
          </header>
          <!-- Left content: fixed height, scroll-y, bg = station color -->
          <main
            class="flex-1 min-h-0 overflow-y-auto px-5 py-3 text-[11px] leading-relaxed border-t-2 border-black"
            :style="{ backgroundColor: stationStyle.bg }"
          >
            <div class="max-w-[330px]">
              <RouterView />
            </div>
          </main>
        </div>

        <!-- Right column: 375×470, image at natural size (quality); exact width to limit red sliver -->
        <aside
          class="h-[450px] w-[375px] min-w-[375px] max-w-[375px] flex-shrink-0 bg-no-repeat bg-left-top"
          :style="{
            backgroundColor: stationStyle.bg,
            backgroundImage: `url(${stationStyle.rightImage})`,
            backgroundSize: 'auto',
          }"
          aria-hidden="true"
        />
      </div>

      <!-- Bottom bar: original Flash-style – station names, triple-line bar, Stations tab (no top border), EPIC + R* logos -->
      <footer class="bg-white border-t border-black">
        <!-- Top row: station names, dark grey, no underline -->
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 pt-2 pb-1 text-[15px] uppercase text-gray-500 font-black" style="font-family: Pricedown, sans-serif">
          <RouterLink
            v-for="s in stations"
            :key="s.key"
            :to="`/${s.key}`"
            class="no-underline hover:no-underline"
          >
            {{ s.label }}
          </RouterLink>
        </div>
        <div class="flex flex-col w-full">
          <div class="h-1 bg-black w-full" />
          <div class="h-1 bg-white w-full" />
          <div class="h-1 bg-black w-full" />
        </div>
        <div class="flex  justify-between min-h-[36px]">
          <div
            class="flex items-center justify-center pl-8 text-black text-sm font-bold uppercase tracking-wider"
          >
            Stations
          </div>
          <div class="flex items-center gap-2 pb-1 pr-3">
             <img src="/images/epic.gif" alt="EPIC" class="h-5 w-12" />
            <img src="/images/rockstar.gif" alt="R*" class="h-7 w-7" />
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const isConnectedViewPage = computed(() => {
  const name = route.name;
  return name === "station-connected-view" || name === "station-connected-bonus";
});

const stations = [
  { key: "v-rock", label: "V-Rock" },
  { key: "wave-103", label: "Wave 103" },
  { key: "emotion-983", label: "Emotion 98.3" },
  { key: "flash-fm", label: "Flash FM" },
  { key: "wildstyle", label: "Wildstyle" },
  { key: "fever-105", label: "Fever 105" },
  { key: "espantoso", label: "Espantoso" },
  { key: "box-set", label: "Box Set" },
];

const stationStyles = {
  "v-rock": { bg: "#c9252c", rightImage: "/images/vol01rightside-nf.jpg" },
  "wave-103": { bg: "#ee4d9b", rightImage: "/images/vol02rightside-nf.jpg" },
  "emotion-983": { bg: "#b19aca", rightImage: "/images/vol03rightside-nf.jpg" },
  "flash-fm": { bg: "#60cce9", rightImage: "/images/vol04rightside-nf.jpg" },
  "wildstyle": { bg: "#0196d6", rightImage: "/images/vol05rightside-nf.jpg" },
  "fever-105": { bg: "#f79331", rightImage: "/images/vol06rightside-nf.jpg" },
  "espantoso": { bg: "#f26522", rightImage: "/images/vol07rightside-nf.jpg" },
  "box-set": { bg: "#E1723f", rightImage: "/images/boxsetrightside-nf.jpg" },
};

const currentStation = computed(
  () => route.params.station?.toString() || "flash-fm",
);

const stationStyle = computed(
  () => stationStyles[currentStation.value] ?? stationStyles["flash-fm"],
);

const stationLinkClass = (key) =>
  key === currentStation.value ? "font-bold underline" : "opacity-80";

const navLinkClass = (section) => {
  const path = route.path;
  if (section === "dj") return path === `/${currentStation.value}` ? "font-bold text-white" : "text-neutral-300";
  if (section === "playlist") return path.endsWith("/playlist") ? "font-bold text-white" : "text-neutral-300";
  if (section === "connected") return path.endsWith("/connected") ? "font-bold text-white" : "text-neutral-300";
  return "text-neutral-300";
};
</script>

