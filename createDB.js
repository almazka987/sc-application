var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
	open,
	dropDatabase,
	requireModels,
	createAreas,
	createWeekPlan,
	createFlySpots,
	createCurrentPlan,
], function(err) {
	console.log(arguments);
	mongoose.disconnect();
	process.exit(err ? 255 : 0);
});

function open(callback) {
	mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
	var db = mongoose.connection.db;
	db.dropDatabase(callback);
}

function requireModels(callback) {
	require('./models/area');
	require('./models/currentplan');
	require('./models/flyspots');
	require('./models/weekplan');

	async.each(Object.keys(mongoose.models), function(modelName, callback) {
		mongoose.models[modelName].ensureIndexes(callback);
	}, callback);
}

function createAreas(callback) {

	var areas = [
		{
			name: 'Ванная',
			tasks: [
			{
				text: 'Убрать клубы пыли под потолком',
				dateLine: [],
			},
			{
				text: 'Прибраться под ванной',
				dateLine: [],
			},
			{
				text: 'Постирать коврик',
				dateLine: [],
			},
			{
				text: 'Почистить ванную',
				dateLine: [],
			},
			],
			startDate: new Date('2016-10-24'),
			finishDate: new Date('2016-10-30'),
		},
		{
			name: 'Прихожая',
			tasks: [
			{
				text: 'Убрать клубы пыли под потолком',
				dateLine: [],
			},
			{
				text: 'Пропылесосить и вытряхнуть коврик',
				dateLine: [],
			},
			{
				text: 'Уборка в шкафу',
				dateLine: [],
			},
			],
			startDate: new Date('2016-10-17'),
			finishDate: new Date('2016-10-23'),
		},
		{
			name: 'Кухня',
			tasks: [
			{
				text: 'Убрать клубы пыли под потолком',
				dateLine: [],
			},
			{
				text: 'Протереть фасады',
				dateLine: [],
			},
			{
				text: 'Почистить кран',
				dateLine: [],
			},
			],
			startDate: new Date('2016-10-10'),
			finishDate: new Date('2016-10-16'),
		},
		{
			name: 'Туалет',
			tasks: [
			{
				text: 'Убрать клубы пыли под потолком',
				dateLine: [],
			},
			{
				text: 'Чистка унитаза',
				dateLine: [],
			},
			{
				text: 'привести в порядок полку',
				dateLine: [],
			},
			],
			startDate: new Date('2016-10-03'),
			finishDate: new Date('2016-10-09'),
		},
		{
			name: 'Гостинная',
			tasks: [
			{
				text: 'Убрать клубы пыли под потолком',
				dateLine: [],
			},
			{
				text: 'Пропылесосить',
				dateLine: [],
			},
			{
				text: 'Уборка в шкафу',
				dateLine: [],
			},
			],
			startDate: new Date('2016-09-19'),
			finishDate: new Date('2016-09-25'),
		},
	];

	async.each(areas, function(areaData, callback) {
		var area = new mongoose.models.Area(areaData);
		area.save(callback);
	}, callback);
}

function createWeekPlan(callback) {

	var items = [
		{
			date: new Date('2016-10-31'),
			content: 'Равным образом укрепление и развитие структуры позволяет выполнять важные задания по разработке направлений прогрессивного развития. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки соответствующий условий активизации.'
		},
		{
			date: new Date('2016-11-01'),
			content: 'Равным образом укрепление и развитие структуры позволяет выполнять важные задания по разработке направлений прогрессивного развития. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки соответствующий условий активизации.'
		},
		{
			date: new Date('2016-11-02'),
			content: 'Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения модели развития.'
		},
		{
			date: new Date('2016-11-03'),
			content: 'Задача организации, в особенности же постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития. Товарищи! реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации форм развития.'
		},
		{
			date: new Date('2016-11-04'),
			content: 'Идейные соображения высшего порядка, а также сложившаяся структура организации в значительной степени обуславливает создание соответствующий условий активизации.'
		},
		{
			date: new Date('2016-11-05'),
			content: 'Равным образом укрепление и развитие структуры позволяет выполнять важные задания по разработке направлений прогрессивного развития. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки соответствующий условий активизации.'
		},
		{
			date: new Date('2016-11-06'),
			content: 'Идейные соображения высшего порядка, а также сложившаяся структура организации в значительной степени обуславливает создание соответствующий условий активизации.'
		},
	];

	async.each(items, function(itemData, callback) {
		var item = new mongoose.models.WeekPlan(itemData);
		item.save(callback);
	}, callback);
}

function createFlySpots(callback) {

	var spots = [
		{
			content: 'Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке форм развития. Разнообразный и богатый опыт рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании новых предложений.',
			startDate: new Date('2016-10-17'),
			finishDate: new Date('2016-10-23'),
		},
		{
			content: 'Таким образом сложившаяся структура организации требуют определения и уточнения дальнейших направлений развития. Равным образом сложившаяся структура организации способствует подготовки и реализации дальнейших направлений развития. Повседневная практика показывает, что сложившаяся структура организации способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям.',
			startDate: new Date('2016-10-24'),
			finishDate: new Date('2016-10-30'),
		},
		{
			content: 'Задача организации, в особенности же постоянный количественный рост и сфера нашей активности способствует подготовки и реализации модели развития. Товарищи! реализация намеченных плановых заданий влечет за собой процесс внедрения и модернизации форм развития.',
			startDate: new Date('2016-10-10'),
			finishDate: new Date('2016-10-16'),
		},
	];

	async.each(spots, function(spotData, callback) {
		var spot = new mongoose.models.FlySpot(spotData);
		spot.save(callback);
	}, callback);
}

function createCurrentPlan(callback) {

	var plans = [
		{content: '<p>Равным образом укрепление и развитие структуры позволяет выполнять важные задания по разработке направлений прогрессивного развития. С другой стороны рамки и место обучения кадров представляет собой интересный эксперимент проверки соответствующий условий активизации. Товарищи! сложившаяся структура организации обеспечивает широкому кругу (специалистов) участие в формировании форм развития. Товарищи! рамки и место обучения кадров играет важную роль в формировании соответствующий условий активизации.</p><p>Повседневная практика показывает, что новая модель организационной деятельности в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также рамки и место обучения кадров требуют определения и уточнения направлений прогрессивного развития. Таким образом реализация намеченных плановых заданий в значительной степени обуславливает создание существенных финансовых и административных условий. Таким образом укрепление и развитие структуры влечет за собой процесс внедрения и модернизации модели развития. Разнообразный и богатый опыт новая модель организационной деятельности представляет собой интересный эксперимент проверки форм развития. Таким образом рамки и место обучения кадров играет важную роль в формировании модели развития.</p>'},
	];

	async.each(plans, function(planData, callback) {
		var plan = new mongoose.models.CurrentPlan(planData);
		plan.save(callback);
	}, callback);
}