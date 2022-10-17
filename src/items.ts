export class Item {
	name: string;
	sellIn: number;
	quality: number;

	constructor(name: string, sellIn: number, quality: number) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}

	clone() {
		return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
	}

	setQuality(quality: number) {
		this.quality = Math.min(Math.max(quality, 0), 50);
	}

	updateQuality() {}
}

export class BasicItem extends Item {
	qualityChange: number;

	constructor(name: string, sellIn: number, quality: number, qualityChange: number = -1) {
		super(name, sellIn, quality);

		this.qualityChange = qualityChange;
	}

	updateQuality() {
		this.sellIn--;

		const qualityMultiplier = this.sellIn >= 0 ? 1 : 2;
		this.setQuality(this.quality + this.qualityChange * qualityMultiplier);
	}
}

export class ConjuredItem extends BasicItem {
	constructor(name: string, sellIn: number, quality: number) {
		super(name, sellIn, quality, -2);
	}
}

export class LegendaryItem extends Item {
	constructor(name: string, quality: number) {
		super(name, 0, quality);
	}
}

export class BackstagePass extends Item {
	updateQuality() {
		if (this.sellIn < 0) {
			this.setQuality(0);
			return;
		}

		let newQuality = this.quality + 1;
		if (this.sellIn <= 10) {
			newQuality++;
		}
		if (this.sellIn <= 5) {
			newQuality++;
		}

		this.setQuality(newQuality);
		this.sellIn--;
	}
}
