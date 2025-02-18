export interface ListItem {
	context: string;
	url: string;
	subjectImg?: string;
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
	contentImg: string;
	contentDesc: string;
	mediaList: CardContent[];
}

export interface FloderItem {
	title: string;
	catalogName: string;
	unit: string;
	catalogDesc: string;
	catalogImg: string;
	contentList: Card[];
}

export interface Subject {
	imgSub?: ListItem;
	alist?: ListItem[];
	subjectDesc: string;
	subjectImg: string;
	context: string;
	catalogList: FloderItem[];
}