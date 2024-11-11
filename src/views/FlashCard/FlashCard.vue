<template>
	<div class="relative flex w-full h-full flex-col">
		<header class="relative h-20 w-full">
			<Transition name="slide-down">
				<div v-show="!pageConfig.showMenu" class="absolute z-30 mt-20 h-screen w-full bg-lt-blue md:right-0 md:h-auto md:max-w-xs md:rounded-b-sm md:py-8 md:shadow-md">
					<div class="flex h-full max-h-[calc(100-80px)] flex-col items-center justify-center gap-10">
						<div class="flex flex-col items-center justify-center gap-5 p-4">
						 <a v-for="item in pageConfig.aList" :href="item.url"
							:key="item.url"
						 	class="text-xl font-semibold text-white" target="_blank" rel="noreferrer">
							{{ item.context }}
						 </a>
						</div>
						<div>
							<div class="flex flex-row items-center justify-center gap-5 p-4">
								<a v-for="item in pageConfig.mediaList" :href="item.url"
									:key="item.url"
									class="h-12 w-12" target="_blank" rel="noreferrer">
									<img :src="item.imageUlr" :alt="item.context" decoding="async">
								</a>
							</div>
						</div>
					</div>
				</div>
			</Transition>
			<div class="relative z-50 py-5 flex flex-row items-center justify-between bg-lt-blue px-2 md:shadow">
				<img v-lazy="imgUrl" decoding="async" alt="" class="max-w-[135.79px]">
				<button type="button" class="text-white" @click="hanleMenuClick">
					<i class="iconfont icon-menu h-6 w-6" v-show="pageConfig.showMenu"></i>
					<i class="iconfont icon-close h-6 w-6" v-show="!pageConfig.showMenu"></i>
					<span class="sr-only">Menu</span>
				</button>
			</div>
		</header>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const host = 'https://app.languagetogether.com';
const imgUrl = ref(host + '/flashcard/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F106329%2F1697827832-language-together-image.svg&w=384&q=75');
const pageConfig = reactive({
	title: 'Flashcard',
	showMenu: true,
	aList: [
		{
			context: 'Flash Card Activities',
			url: 'https://www.datocms-assets.com/106329/1694886590-language-together-spanish-flash-cards-for-kids-set-1-activities-sampler.pdf',
		},
		{
			context: 'Contact Us',
			url: 'https://languagetogether.com/contact',
		},
		{
			context: 'Shop Online',
			url: 'https://languagetogether.com',
		},
		{
			context: 'Technical Support',
			url: 'https://languagetogether.com/pages/flashcards-support',
		},
		{
			context: 'Terms & Conditions',
			url: 'https://languagetogether.com/pages/legal',
		}
	],
	mediaList: [
		{
			context: 'Facebook',
			url: 'https://www.facebook.com/languagetogether.net',
			imageUlr: `${host}/flashcard/_next/image?url=%2Fflashcard%2F_next%2Fstatic%2Fmedia%2Ffacebook-square-brands.48ef9a9d.svg&w=1080&q=75`
		},
		{
			context: 'Instagram',
			url: 'https://twitter.com/LanguageTogethr',
			imageUlr: `${host}/flashcard/_next/image?url=%2Fflashcard%2F_next%2Fstatic%2Fmedia%2Ftwitter-square-brands.08b43fc3.svg&w=1080&q=75`,
		},
		{
			context: 'Instagram',
			url: 'https://www.instagram.com/languagetogether',
			imageUlr: `${host}/flashcard/_next/image?url=%2Fflashcard%2F_next%2Fstatic%2Fmedia%2Finstagram-square-brands.44723478.svg&w=1080&q=75`,
		}
	]
});

const hanleMenuClick = () => {
	pageConfig.showMenu = !pageConfig.showMenu;
};
</script>

<style lang="scss" scoped>
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.5s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  transform: translateY(-100%);
  // opacity: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  transform: translateY(0);
  // opacity: 1;
}
</style>