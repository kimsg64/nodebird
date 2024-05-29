// data
const TARGET = 9610;

const NORMAL = "normal";
const WALL = "wall";
const FINISHING = "finishing"; // 5~7
const STORAGE = "storage"; // 8~13
const BATHROOM = "bathroom"; // 14~16
const KITCHEN = "kitchen"; // 18~19
const KITCHENKIMCHI = "kitchenkimchi"; // 20~24
// const KIMCHI = "kimchi"; // 20~21
// const KITCHENFIT = "kitchenfit"; // 23~24

const options = [
	{ name: "보조주방 가구", value: 327, group: NORMAL },
	{ name: "포세린타일", value: 563, group: NORMAL },
	{ name: "슬라이딩 붙박이장", value: 489, group: WALL },
	{ name: "유리월", value: 458, group: WALL },
	{ name: "마감특화일", value: 1024, group: FINISHING },
	{ name: "마감특화이", value: 1342, group: FINISHING },
	{ name: "마감특화이다시이", value: 1256, group: FINISHING },
	{ name: "수납특화일에이", value: 1810, group: STORAGE },
	{ name: "수납특화일비", value: 1787, group: STORAGE },
	{ name: "수납특화일씨", value: 1814, group: STORAGE },
	{ name: "수납특화이에이", value: 2787, group: STORAGE },
	{ name: "수납특화이비", value: 2764, group: STORAGE },
	{ name: "수납특화이치", value: 2791, group: STORAGE },
	{ name: "욕실특화일", value: 208, group: BATHROOM },
	{ name: "욕실특화이에이", value: 1073, group: BATHROOM },
	{ name: "욕실특화이비", value: 1089, group: BATHROOM },
	{ name: "조명특화", value: 613, group: NORMAL },
	{ name: "주방특화일", value: 3366, group: KITCHEN },
	{ name: "주방특화이", value: 5531, group: KITCHEN },
	{ name: "김냉일", value: 182, group: KITCHENKIMCHI },
	{ name: "김냉이", value: 415, group: KITCHENKIMCHI },
	{ name: "냉장고", value: 986, group: KITCHENKIMCHI },
	{ name: "키친핏일", value: 424, group: KITCHENKIMCHI },
	{ name: "키친핏이", value: 674, group: KITCHENKIMCHI },
	{ name: "식세기", value: 120, group: NORMAL },
	{ name: "전기오븐", value: 45, group: NORMAL },
	{ name: "안방제습", value: 66, group: NORMAL },
	{ name: "빨래", value: 19, group: NORMAL },
	{ name: "비데일", value: 38, group: NORMAL },
	{ name: "비데이", value: 38, group: NORMAL },
	{ name: "공기청정", value: 66, group: NORMAL },
	{ name: "무기질도료", value: 411, group: NORMAL },
];

// group별 분류
const groups = {};
options.forEach((option) => {
	const targetGroup = option.group;
	if (!groups[targetGroup]) {
		groups[targetGroup] = [];
	}
	groups[targetGroup].push(option);
});
console.log("groups", groups);

// 주어진 리스트의 조합을 생성하는 함수
const getCombinations = (arr) => {
	const result = [];

	const recurse = (prefix = [], arr) => {
		for (let i = 0; i < arr.length; i++) {
			result.push([...prefix, arr[i]]);
			recurse([...prefix, arr[i]], arr.slice(i + 1));
		}
	};
	recurse([], arr);
	return result;
};

// normal 조합 구하기
const normalCombinations = getCombinations(groups.normal);
console.log("normalCombinations", normalCombinations);

// 각 그룹에서 하나씩 선택
const nonNormalGroups = Object.keys(groups).filter((group) => group !== NORMAL);
console.log("nonNormalGroups", nonNormalGroups);
const otherCombinations = [[]];

nonNormalGroups.forEach((group) => {
	const tempCombinations = [];

	// 해당 그룹에서 0개 선택
	tempCombinations.push([]);

	// 해당 그룹에서 1개 선택
	groups[group].forEach((option) => {
		otherCombinations.forEach((combination) => {
			tempCombinations.push([...combination, option]);
		});
	});
	otherCombinations.length = 0;
	otherCombinations.push(...tempCombinations);
});
console.log("otherCombinations", otherCombinations);

// normal + 각 그룹 조합 생성
const allCombinations = [];
normalCombinations.forEach((normalCombination) => {
	otherCombinations.forEach((otherCombination) => {
		allCombinations.push([...normalCombination, ...otherCombination]);
	});
});

// 합이 9610인 조합 필터링
const validCombinations = allCombinations.filter((combination) => {
	const totalValue = combination.reduce((sum, option) => sum + option.value, 0);
	return totalValue === TARGET;
});
console.log("result:::", validCombinations);

const Temp = () => {
	return <div>hello world</div>;
};

export default Temp;
