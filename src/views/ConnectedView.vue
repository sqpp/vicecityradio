<template>
  <section>
    <RouterLink v-if="titleImageLoaded" :to="`/${currentStation}/connected/view`" class="block mb-3 w-[200px]">
      <img
        :src="titleImage"
        alt="ConnecteD – click to open"
        width="200"
        height="25"
        class="block h-[25px] w-[200px] object-contain object-left-top"
        @error="titleImageLoaded = false"
      />
    </RouterLink>
    <p v-else class="mb-3 text-base font-bold text-black">ConnecteD</p>

    <p class="mb-3 text-[11px] leading-relaxed text-black">
      {{ connectedIntro }}
    </p>

    <p class="mb-3 text-[11px] leading-relaxed text-black" v-html="connectedRequirements"></p>

    <RouterLink :to="`/${currentStation}/connected/view`" class="block mt-2 mb-3 w-[200px]">
      <img
        :src="titleImage"
        alt="ConnecteD – click to open"
        width="200"
        height="25"
        class="block h-[25px] w-[200px] object-contain object-left-top"
      />
    </RouterLink>

    <p class="mb-3 text-[11px] text-black">
      {{ connectedFooter }}
    </p>

    <div class="mt-4 text-[11px] text-black">
      <p class="font-bold mb-2">System Requirements:</p>
      <p class="mb-2">
        Macromedia Shockwave Ver 8.5 or higher –
        <a href="http://www.macromedia.com/go/getshockwaveplayer/" target="_blank" rel="noopener" class="underline" style="color: #620915">Click here to download</a>
        <a href="http://www.macromedia.com/go/getshockwaveplayer/" target="_blank" rel="noopener" class="inline-block align-middle ml-1"><img :src="shockwaveLogoUrl" alt="Get Shockwave" width="88" height="31" /></a>
      </p>
      <p class="mb-3">
        QuickTime 6 –
        <a href="http://www.apple.com/quicktime/download/" target="_blank" rel="noopener" class="underline" style="color: #620915">Click here to download</a>
      </p>
      <p class="mb-3">
        <a href="http://www.apple.com/quicktime/download/" target="_blank" rel="noopener" class="inline-block"><img :src="quicktimeLogoUrl" alt="Get QuickTime" width="88" height="31" /></a>
      </p>
      <p class="font-bold mb-1">WINDOWS</p>
      <p class="mb-1">166 MHz Intel Pentium processor or greater</p>
      <p class="mb-1">Windows 95, 98, NT4, or 2000</p>
      <p class="mb-1">32 MB of installed RAM</p>
      <p class="mb-1">Netscape 4.0 or greater</p>
      <p class="mb-1">Internet Explorer 4.0 or greater</p>
      <p class="mb-3">AOL 4.0 or greater</p>
      <p class="font-bold mb-1">MACINTOSH</p>
      <p class="mb-1">120 MHz PowerPC</p>
      <p class="mb-1">MAC OS 8.1 or later</p>
      <p class="mb-1">32 MB or more of installed RAM</p>
      <p class="mb-1">Netscape 4.0 or greater</p>
      <p class="mb-1">Internet Explorer 5.0 or greater</p>
      <p class="mb-1">AOL 4.0 or greater</p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const titleImageLoaded = ref(true);

watch(
  () => route.params.station,
  () => { titleImageLoaded.value = true; },
  { immediate: true }
);
const currentStation = computed(() => route.params.station?.toString() || "flash-fm");

const shockwaveLogoUrl = "/images/get_shockwave_88_31.gif";
const quicktimeLogoUrl = "/images/getquicktime.gif";

const stationLabels = {
  "v-rock": "V-Rock",
  "wave-103": "Wave 103",
  "emotion-983": "Emotion 98.3",
  "flash-fm": "Flash FM",
  "wildstyle": "Wildstyle",
  "fever-105": "Fever 105",
  "espantoso": "Espantoso",
  "box-set": "Box Set",
};
const stationLabel = computed(() => stationLabels[currentStation.value] ?? currentStation.value);

const connectedIntro = computed(() => {
  const intros = {
    "v-rock": "With your copy of Grand Theft Auto: Vice City O.S.T. - Volume 1: V-Rock, a connection to the internet, and the minimum system requirements you'll be able to access an exclusive cheat code, a Vice City screensaver & computer wallpaper, Vice City movie clip & more!",
    "wave-103": "ConnecteD intro for Wave 103.",
    "emotion-983": "ConnecteD intro for Emotion 98.3.",
    "flash-fm": "ConnecteD intro for Flash FM.",
    "wildstyle": "ConnecteD intro for Wildstyle.",
    "fever-105": "ConnecteD intro for Fever 105.",
    "espantoso": "ConnecteD intro for Espantoso.",
    "box-set": "ConnecteD for the Box Set (all volumes).",
  };
  return intros[currentStation.value] ?? "ConnecteD for this station.";
});

const connectedRequirements = computed(() => {
  const vol = { "v-rock": "Volume 1: V-Rock", "wave-103": "Volume 2: Wave 103", "emotion-983": "Volume 3: Emotion 98.3", "flash-fm": "Volume 4: Flash FM", "wildstyle": "Volume 5: Wildstyle", "fever-105": "Volume 6: Fever 105", "espantoso": "Volume 7: Espantoso", "box-set": "Box Set" };
  const title = vol[currentStation.value] ?? "this volume";
  return `In order to get ConnecteD, you will need the following:<br />A copy of <u>Grand Theft Auto: Vice City O.S.T. - ${title}</u><br />A PC (minimum system requirements)<br />A CD-ROM drive<br />An Internet connection`;
});

const connectedFooter = computed(() => {
  return "System requirements and Shockwave/QuickTime download links from the original site can be added here if you want a fully faithful reproduction.";
});

const titleImage = computed(() => {
  const map = {
    "v-rock": "/images/vol01-connect.gif",
    "wave-103": "/images/vol02-connect.gif",
    "emotion-983": "/images/vol03-connect.gif",
    "flash-fm": "/images/vol04-connect.gif",
    "wildstyle": "/images/vol05-connect.gif",
    "fever-105": "/images/vol06-connect.gif",
    "espantoso": "/images/vol07-connect.gif",
    "box-set": "/images/boxset-connect.gif",
  };
  return map[currentStation.value] ?? "/images/vol01-connect.gif";
});
</script>
