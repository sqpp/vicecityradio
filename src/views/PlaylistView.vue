<template>
  <section>
    <img
      v-if="titleImageLoaded"
      :src="titleImage"
      alt="Playlist"
      width="200"
      height="25"
      class="mb-3 block h-[25px] w-[200px] object-contain object-left-top"
      @error="titleImageLoaded = false"
    />
    <p v-else class="mb-3 text-base font-bold text-black">Playlist</p>

    <p class="mb-3 text-[11px] leading-relaxed text-black">
      {{ playlistIntro }}
    </p>

    <p v-if="playlistPreview" class="mb-3 text-[11px] text-black">
      {{ playlistPreview }}
    </p>

    <div class="space-y-1 text-[11px] text-black">
      <p class="font-bold">{{ playlistTitle }}</p>
      <p>1. DJ Lazlow Intro</p>
      <p>2. You've Got Another Thing Comin' - Judas Priest</p>
      <p>3. Too Young to Fall in Love - Mötley Crüe</p>
      <p>4. Peace Sells - Megadeth</p>
      <p>5. Dangerous Bastard - Rockstar's Love Fist</p>
      <p>6. Turn Up The Radio - Autograph</p>
      <p>7. DJ Lazlow Halftime</p>
      <p>8. I Wanna Rock - Twisted Sister</p>
      <p>9. Bark At The Moon - Ozzy Osbourne</p>
      <p>10. Madhouse - Anthrax</p>
      <p>11. 2 Minutes To Midnight - Iron Maiden</p>
      <p>12. Raining Blood - Slayer</p>
      <p>13. Cumin' Atcha Live - Tesla</p>
      <p>14. Yankee Rose - David Lee Roth</p>
      <p>15. DJ Lazlow Outro</p>
      <p>16. Exploder</p>
      <p>17. Thor</p>
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

const playlistIntro = computed(() => {
  const intros = {
    "v-rock": "A relentless collection of hard-rock bangers, brought to you by the inimitable Lazlow. From a time when rock & roll was all about living and playing hard. Featuring classic material from legendary acts like Judas Priest and Ozzy Osbourne.",
    "wave-103": "Playlist intro for Wave 103.",
    "emotion-983": "Playlist intro for Emotion 98.3.",
    "flash-fm": "Playlist intro for Flash FM.",
    "wildstyle": "Playlist intro for Wildstyle.",
    "fever-105": "Playlist intro for Fever 105.",
    "espantoso": "Playlist intro for Espantoso.",
    "box-set": "Playlist content for the Box Set (all volumes).",
  };
  return intros[currentStation.value] ?? "Playlist for this station.";
});

const playlistPreview = computed(() => {
  if (currentStation.value === "v-rock") return "Preview: Windows Media: 28K | 100K";
  return "";
});

const playlistTitle = computed(() => {
  const titles = {
    "v-rock": "Grand Theft Auto: Vice City V-Rock",
    "wave-103": "Grand Theft Auto: Vice City Wave 103",
    "emotion-983": "Grand Theft Auto: Vice City Emotion 98.3",
    "flash-fm": "Grand Theft Auto: Vice City Flash FM",
    "wildstyle": "Grand Theft Auto: Vice City Wildstyle",
    "fever-105": "Grand Theft Auto: Vice City Fever 105",
    "espantoso": "Grand Theft Auto: Vice City Espantoso",
    "box-set": "Grand Theft Auto: Vice City Official Soundtrack Box Set",
  };
  return titles[currentStation.value] ?? "Playlist";
});

const titleImage = computed(() => {
  const map = {
    "v-rock": "/images/vol01-playlist.gif",
    "wave-103": "/images/vol02-playlist.gif",
    "emotion-983": "/images/vol03-playlist.gif",
    "flash-fm": "/images/vol04-playlist.gif",
    "wildstyle": "/images/vol05-playlist.gif",
    "fever-105": "/images/vol06-playlist.gif",
    "espantoso": "/images/vol07-playlist.gif",
    "box-set": "/images/boxset-playlist.gif",
  };
  return map[currentStation.value] ?? "/images/vol01-playlist.gif";
});
</script>
