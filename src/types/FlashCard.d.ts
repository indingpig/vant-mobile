export interface ListItem {
	context: string;
	url: string;
}

export interface MediaItem extends ListItem {
	imageUrl: string;
}

export interface CardContent {
	language?: string;
	wordAudioUrl?: string;
	sentenceAudioUrl?: string;
	word?: string;
	sentence?: string;
}

export interface Card {
	imgUrl: string;
	content: CardContent[];
}

export interface FloderItem {
	title: string;
	unit: string;
	img: string;
	cards: Card[];
}

export interface Subject {
	imgSub?: ListItem;
	alist?: ListItem[];
	h1: string;
	floders: FloderItem[];
}