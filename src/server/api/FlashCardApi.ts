import request from '@/server/utils/request';

export const flashAPiString = {
	adUrl: '/flashCard/ad',
};

export function getFlashCardList(params: unknown) {
	return request({
		url: '/flashCard/list',
		method: 'get',
		params,
	});
}

export function getADImgApi(url: string) {
	return request({
		url: url,
		method: 'get',
	});
}