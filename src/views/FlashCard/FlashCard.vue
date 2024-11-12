<template>
	<div class="relative flex w-full h-full flex-col" style="height:calc(100vh - env(safe-area-inset-bottom));">
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
									<img :src="item.imageUrl" :alt="item.context" decoding="async">
								</a>
							</div>
						</div>
					</div>
				</div>
			</Transition>
			<div class="relative z-50 py-5 flex flex-row items-center justify-between bg-lt-blue px-2 md:shadow">
				<img v-lazy="logoUrl" decoding="async" alt="" class="max-w-[135.79px]">
				<button type="button" class="text-white" @click="hanleMenuClick">
					<i class="iconfont icon-menu h-6 w-6" v-show="pageConfig.showMenu"></i>
					<i class="iconfont icon-close h-6 w-6" v-show="!pageConfig.showMenu"></i>
					<span class="sr-only">Menu</span>
				</button>
			</div>
		</header>
		<main class="overflow-y-scrol h-screen flex-auto overflow-x-hidden bg-linear-bisque">
			<div class="flex flex-col">
				<div class="mx-2 mb-2 mt-4">
					<div class="mx-auto w-full sm:max-w-5xl">
						<div class="flex w-full max-w-[450px] flex-row items-center gap-4 sm:max-w-sm">
							<div class="w-[150px] shrink-0 grow-0 sm:w-[175px]">
								<img v-lazy="pageConfig.subject?.imgSub?.url" :alt="pageConfig.subject?.imgSub?.context" decoding="async">
							</div>
							<div class="flex w-full flex-auto flex-col gap-2 sm:gap-4">
								<h1 class="text-xl font-extrabold sm:text-2xl" v-html="pageConfig.subject?.h1"></h1>
								<div class="flex flex-col gap-1 text-left font-semibold text-lt-blue sm:flex-row sm:gap-1.5">
									<a v-for="item in pageConfig.subject?.alist"
										:key="item.url" :href="item.url"
										class="whitespace-nowrap" target="_blank" rel="noreferrer">
										{{ item.context }}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="relative mx-auto w-full" style="max-width:calc(100% - env(safe-area-inset-right) - env(safe-area-inset-left))">
					<div class="mx-auto w-full sm:max-w-5xl">
						<ul class="snap-y snap-mandatory overflow-y-auto">
							<li>
								<div class="m-2">
									<button type="button" class="flex w-full select-none items-center justify-between rounded bg-white rounded-b-none">
										<div class="flex flex-row items-center gap-2 p-2">
											<div class="h-[75px] w-[104px] rounded">
												<img src="https://app.languagetogether.com/flashcard/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F106329%2F1696012855-lt_the_fam.jpg&w=256&q=75" alt="Family Morning" class="rounded">
											</div>
											<div class="flex flex-col justify-start text-left">
												<span class="text-lg font-semibold">Family Morning</span>
												<span class="text-sm uppercase text-gray-500">Cards 1-10</span>
											</div>
										</div>
										<i class="flex items-center justify-center mr-2 h-8 w-8 text-lt-blue transition-transform iconfont font-sise-26 icon-tianjia"
											@click="handleOpenClick"
											:class="{ 'rotate-45': openInt, 'transform': openInt }">
										</i>
									</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import DATA from './testData.json';
const host = 'https://app.languagetogether.com';
const logoUrl = ref(host + '/flashcard/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F106329%2F1697827832-language-together-image.svg&w=384&q=75');
interface ListItem {
	context: string;
	url: string;
}

interface MediaItem extends ListItem {
	imageUrl: string;
}

interface Subject {
	imgSub?: ListItem;
	alist?: ListItem[];
	h1: string;
}

const pageConfig = reactive({
	title: 'Flashcard',
	showMenu: true,
	aList: [] as ListItem[],
	mediaList: [] as MediaItem[],
	subject: {} as Subject | undefined,
});

const openInt = ref(false);

const hanleMenuClick = () => {
	pageConfig.showMenu = !pageConfig.showMenu;
};

const handleOpenClick = () => {
	openInt.value = !openInt.value;
};

const init = () => {
	pageConfig.aList = DATA.aList;
	pageConfig.mediaList = DATA.mediaList;
	pageConfig.subject = DATA.subject;
};

onMounted(() => {
	init();
});

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