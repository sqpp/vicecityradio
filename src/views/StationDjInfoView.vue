<template>
  <section>
    <!-- DJ INFO heading: image only (e.g. vol01-info.gif 200×25) -->
    <img
      :src="djInfoImage"
      alt="DJ INFO"
      width="200"
      height="25"
      class="mb-3 block h-[25px] w-[200px] object-contain object-left-top"
    />
    <!-- Box Set: all stations with bold titles -->
    <template v-if="currentStation === 'box-set'">
      <div v-for="section in boxSetSections" :key="section.title" class="mb-4">
        <p class="text-[9px] font-bold text-black mb-1">{{ section.title }}</p>
        <p class="text-[9px] leading-relaxed text-black">{{ section.text }}</p>
      </div>
    </template>
    <!-- Single station -->
    <p v-else class="text-[9px] leading-relaxed text-black ">
      {{ stationText }}
    </p>

    <!-- Copyright + EPIC logo + links: center-aligned like original -->
    <div class="mt-6 flex flex-col items-center gap-2 text-center text-[9px] text-black">
      <a href="http://www.epicrecords.com" target="_blank" rel="noopener" class="block">
        <img src="/images/epic.gif" alt="Epic Records" width="50" height="20" class="mx-auto block h-5 w-[50px] object-contain" />
      </a>
      <p>
        Copyright © 2004 Sony Music Entertainment Inc. All Rights Reserved.<br />
        "Epic" and Epic "sunburst" logo are registered trademarks<br />
        of Sony Music Entertainment Inc.
      </p>
      <p>
        <a
          href="http://www.sonymusic.com/about/feedback.cgi"
          target="_blank"
          rel="noopener"
          class="underline"
          style="color: #620915"
        >
          Send Us Feedback
        </a>
        |
        <a
          href="http://www.sonymusic.com/privacy/"
          target="_blank"
          rel="noopener"
          class="underline"
          style="color: #620915"
        >
          Privacy Policy
        </a>
        |
        <a
          href="http://www.sonymusic.com/sony/terms.html"
          target="_blank"
          rel="noopener"
          class="underline"
          style="color: #620915"
        >
          Terms and Conditions
        </a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const texts = {
  "v-rock":
    "Fast talking, mullet sporting, career obsessed DJ Lazlow is a man who believes he is on the way to the top. He loves the rock and roll life style, although he doesn't actually live it, and worships every morning at his mirror. He stole the V-Rock gig off his best friend and is desperate to get rid of the Vulture and make sure the focus remains tightly on himself. He believes being on the radio is a one way ticket to all the riches and girls the world has to offer. Unfortunately, it seems his ego may be the death of his career in rock and roll. Only time will tell.",
  "wave-103":
    "Adam First knows everything. He knows about politics - extreme right wings are the way forward. He knows about astronomy - he owns a large telescope. He knows about exciting new sports - hang gliding and driving expensive cars are both favorite pastimes. He knows about the dangers of wearing make up - it can run and make you even more confused. But, most of all, he knows how to make you feel bad about yourself. The fact is, he knows a lot more about everything than you, and, the only thing he isn't an expert on is what it might mean to be a human being. After all, in his words \"We are, ultimately, all alone, and I'm incapable of expressing emotion in any way, shape or form apart from through the medium of mix tapes.\" Luckily, with this new compact disc from WAVE 103, he is able to express himself the only way he knows.",
  "emotion-983":
    "Fernando Martinez is a genius. A miracle worker. An emotional alchemist and a heart mender. Let him work his magic on you as he takes you on a journey from the deepest depths of the human soul to soaring up in the clouds with the birds or the people on extra strong anti-depressants. Perfect listening for after a therapy session or a paternity case. Fernando explains the remarkable intersection of life, love and music in this wonderful recording that says more about the human heart than words ever could. Since he was a little boy, Fernando wanted only one thing, to bring people together any way he could and make money out of it. Now, with this wonderful compact disc, you can make his dreams come true. You get dragged across an emotional minefield, terrified of what might happen.",
  "flash-fm":
    "Toni loves to party. Toni lives to party. Toni can almost spell party. Her dream is an evening on a back of a tour bus playing strip poker with any band from Britain, while burning a hole in her septum, and unlike many people, her dreams are coming all too true. She can't foresee a time when she will be older, as she is probably too stupid, but she loves the music almost as much as she loves the partying. She can't imagine what it would be like to be thirty, and really hates old people who have their heads stuck in the past. And who can blame her? With a hair full of spray, loads of  bracelets on her wrist and a blocked nose, no one can stop her on her way to the top, the top floor of a hotel downtown where she's planning to stay up for three days and do at least 18 illegal or immoral acts. ",
  "wildstyle":
    "The Magic is here.  A pioneer in the truest sense of the word, \"Supa Rockin\" Mr. Magic has the distinction of being the very first radio personality ever to bring rap music to the airwaves.  On Wildstyle Pirate Radio, Mr. Magic hosted the innovative new sounds of rap music and early 80's electro for all of Vice City's fly girls and fly guys, troopers and troopettes, broadcasting illegally, we are repeatedly told, 'from a secret location'.  Magic was also hosting a weekly show in New York at the time…",
  "fever-105":
    "For Oliver \"Ladykiller\" Biscuit, only two things in life really matter. Eating food and seducing women. Weighing in at 300 pounds and seducing an average of 35 women a week (not including twins), he's been the man in charge of Fever 105 for a few years and has worn more velour sweat suits and sat in more Jacuzzis than you've had hot dinners. Doughnuts, foxes, a little disco soul, 15 hot dogs, a big ole party, Oliver Cheatham, too many needles in too many grooves, these are the things dreams are made of. ",
  "espantoso":
    "Pepe wanted to be a sports commentator. When that didn't work out (he was told he got too excited and ruined people' enjoyment of the game) he turned to music. He genuinely loves the music he plays and even more than that, loves the opportunity to shout very loud into a microphone. He has lived in Vice City for a few years now and is desperately trying to spread the word of quality music in the cultural desert of the 1980s. The only cloud on the horizon is his wife. A dreadful woman who has taken the American dream to her heart and her waist, she has left Pepe confused by everything apart from the music.",
  "box-set":
    "Box set DJ information can go here if you’d like to mirror that page too.",
};

const currentStation = computed(
  () => route.params.station?.toString() || "flash-fm",
);

const stationText = computed(
  () => texts[currentStation.value] ?? texts["flash-fm"],
);

const boxSetSections = computed(() => [
  { title: "V-Rock: DJ INFO", text: texts["v-rock"] },
  { title: "Radio Espantoso: DJ INFO", text: texts.espantoso },
  { title: "Fever 105: DJ INFO", text: texts["fever-105"] },
  { title: "Wildstyle Pirate Radio: DJ INFO", text: texts.wildstyle },
  { title: "Wave 103: DJ INFO", text: texts["wave-103"] },
  { title: "Emotion 98.3: DJ INFO", text: texts["emotion-983"] },
  { title: "Flash FM: DJ INFO", text: texts["flash-fm"] },
]);

const djInfoImage = computed(() => {
  const map = {
    "v-rock": "/images/vol01-info.gif",
    "wave-103": "/images/vol02-info.gif",
    "emotion-983": "/images/vol03-info.gif",
    "flash-fm": "/images/vol04-info.gif",
    "wildstyle": "/images/vol05-info.gif",
    "fever-105": "/images/vol06-info.gif",
    "espantoso": "/images/vol07-info.gif",
    "box-set": "/images/boxset-info.gif",
  };
  return map[currentStation.value] ?? "/images/vol04-info.gif";
});
</script>

