<template>
	<div>
		<img src="" alt="" @click="goToAD" />
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getADImgApi } from '@/server/api/FlashCardApi';

const props = defineProps<{
	api: string;
}>();
const imgUrl = ref('');
const targetAdUrl = ref('');
const getADImg = () => {
	getADImgApi(props.api).then((res) => {
		debugger;
		imgUrl.value = res.data.imgUrl;
		targetAdUrl.value = res.data.targetAdUrl;
	});
};

const goToAD = () => {
	window.open(targetAdUrl.value, '_blank');
};

onMounted(() => {
	getADImg();
});

</script>

<style lang="scss" scoped>

</style>