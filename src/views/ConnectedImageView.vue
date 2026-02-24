<template>
  <section
    class="connected-flow text-black h-full min-h-[450px] w-full flex flex-col relative"
    style="
      font-family: Pricedown, sans-serif;
      text-shadow: -1px 0 #000, 1px 0 #000, 0 -1px #000, 0 2px #000;
      -webkit-font-smoothing: none;
    "
    @mousemove="onMouseMove"
  >
    <!-- Background image: full section, behind content -->
    <img
      :src="connectedImageUrl"
      alt=""
      class="absolute inset-0 w-full h-full object-contain object-center pointer-events-none z-0"
      aria-hidden="true"
    />

    <!-- Content (above background) -->
    <div class="relative z-10 flex flex-col flex-1 min-h-[450px]">
    <!-- All steps: content centered -->
    <div class="flex-1 flex items-center justify-center py-4">
      <div class="text-center max-w-[320px]">
    <!-- 1. Loading -->
    <template v-if="step === 'loading'">
      <p class="text-xl text-white">Loading...</p>
    </template>

    <!-- 2. Insert CD -->
    <template v-else-if="step === 'insert_cd'">
      <p class="text-xl text-white leading-relaxed mb-2">
        Please insert your copy of:
      </p>
      <p class="text-xl  leading-5 font-bold mb-2 text-[#B43033]">
        Grand Theft Auto Vice City O.S.T.<br />
        {{ volumeTitle }}
      </p>
      <p class="text-xl text-white leading-5 mb-4 ">
        into the computer's CD drive.<br />
        When this is done, press
      </p>
      <button
        type="button"
        class="px-6 py-2 text-xl font-bold uppercase border-2 border-black  text-white  transition-colors"
        style="font-family: Pricedown, sans-serif"
        @click="onStart"
      >
        start
      </button>
    </template>

    <!-- 3. Checking -->
    <template v-else-if="step === 'checking'">
      <p class="text-lg text-white leading-relaxed text-white">
        Checking your CD drive...<br />
        one moment please
      </p>
    </template>

    <!-- 4. Results -->
    <template v-else-if="step === 'result'">
      <!-- Error: CD not found -->
      <template v-if="resultType === 'error'">
        <p class="text-[11px] leading-relaxed mb-2">
          We were unable to find:
        </p>
        <p class="text-[11px] leading-relaxed font-bold mb-4">
          Grand Theft Auto Vice City O.S.T.<br />
          {{ volumeTitle }}
        </p>
        <p class="text-[11px] mb-1">
          <a href="#" class="underline hover:no-underline" style="color: #620915" @click.prevent="onTryAgain">click here to try again</a>
        </p>
        <p class="text-[11px]">
          or <a href="#" class="underline hover:no-underline" style="color: #620915" @click.prevent="onFaq">click here to consult the FAQ for more info</a>
        </p>
      </template>

      <!-- Success -->
      <template v-else-if="resultType === 'success'">
        <p class="text-xl text-white font-bold mb-4">Disk Verified</p>
        <p class="text-xl text-white">
          <RouterLink :to="connectedBackUrl">click here to continue</RouterLink>
        </p>
      </template>

      <!-- Xtra unavailable -->
      <template v-else-if="resultType === 'xtra_unavailable'">
        <p class="text-[11px] leading-relaxed mb-4">
          We were unable to detect the<br />
          ConnecteD Xtra on your computer
        </p>
        <p class="text-[11px]">
          <a href="#" class="underline hover:no-underline" style="color: #620915" @click.prevent="onFaq">click here to consult the FAQ for more info</a>
        </p>
      </template>

      <!-- CD undetectable after 3 tries -->
      <template v-else-if="resultType === 'cd_undetectable_3'">
        <p class="text-[11px] leading-relaxed mb-4">
          After three tries, we were unable to<br />
          detect the CD in your computer
        </p>
        <p class="text-[11px]">
          <a href="#" class="underline hover:no-underline" style="color: #620915" @click.prevent="onFaq">click here to consult the FAQ for more info</a>
        </p>
      </template>
    </template>
      </div>
    </div>

    <!-- Loading cursor icon that follows the mouse while checking -->
    <img
      v-if="step === 'checking'"
      src="/images/loading.gif"
      alt=""
      class="pointer-events-none fixed z-50 w-6 h-6"
      :style="{ top: mouseY + 'px', left: mouseX + 'px' }"
    />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentStation = computed(() => route.params.station?.toString() || "flash-fm");

const step = ref("loading");
const resultType = ref(null);
const tryCount = ref(0);
let checkingTimer = null;
let loadingTimer = null;

const volumeTitle = ref("this volume");
const bonusMessage = ref("");
const mouseX = ref(0);
const mouseY = ref(0);

const configPaths = {
  "v-rock": "/connected/vrock/config.xml",
  "wave-103": "/connected/wave/config.xml",
  "emotion-983": "/connected/emotion/config.xml",
  "flash-fm": "/connected/flashfm/config.xml",
  "wildstyle": "/connected/wildstyle/config.xml",
  "fever-105": "/connected/fever/config.xml",
  "espantoso": "/connected/espantoso/config.xml",
};

const connectedImageUrl = "/images/connected.png";
const checkingSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/connected-check.mp3") : null;

if (checkingSound) {
  checkingSound.volume = 0.5;
  checkingSound.loop = true;
}

const connectedBackUrl = computed(() => `/${currentStation.value}/connected/bonus`);

function onStart() {
  step.value = "checking";
  resultType.value = null;
  if (checkingSound) {
    try {
      checkingSound.currentTime = 0;
      void checkingSound.play();
    } catch (e) {
      // ignore autoplay errors
    }
  }
  checkingTimer = setTimeout(() => {
    // For now, always succeed after checking
    resultType.value = "success";
    step.value = "result";
  }, 5000);
}

function onMouseMove(event) {
  if (step.value === "checking") {
    mouseX.value = event.clientX + 12;
    mouseY.value = event.clientY + 12;
  }
}

function onTryAgain() {
  tryCount.value = 0;
  step.value = "insert_cd";
}

function onFaq() {
  window.open("#", "_blank");
}

onMounted(() => {
  // Load station-specific config (fake XML) and then start flow
  const path = configPaths[currentStation.value];
  if (path) {
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");
        const attrNode = xml.querySelector("dataList > entry[id='!ATTRIBUTES']");
        if (attrNode) {
          const album = attrNode.getAttribute("albumname");
          const bonus = attrNode.getAttribute("bonusmessage");
          if (album) volumeTitle.value = album.replace("Grand Theft Auto Vice City O.S.T. - ", "");
          if (bonus) bonusMessage.value = bonus;
        }
      })
      .catch(() => {
        // fall back silently; we already have defaults
      })
      .finally(() => {
        loadingTimer = setTimeout(() => {
          step.value = "insert_cd";
        }, 1500);
      });
  } else {
    loadingTimer = setTimeout(() => {
      step.value = "insert_cd";
    }, 1500);
  }
});

onUnmounted(() => {
  if (loadingTimer) clearTimeout(loadingTimer);
  if (checkingTimer) clearTimeout(checkingTimer);
  if (checkingSound) {
    checkingSound.pause();
  }
});
</script>
