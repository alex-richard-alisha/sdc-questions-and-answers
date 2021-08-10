
const questionSchema = new Schema({
	question_id: Number,
	product_id: Number,
	question_body: String,
	question_date: String,
	question_helpfulness: Number,
	reported: Boolean,
	answers: {
		answer_id: {
			answer_id: Number,
			answer_body: String,
			answer_date: String | Date,
			answerer_name: String,
			helpfulness: Number,
			photos: [{id: Number, url: String}]
		}
	}
});

const answerSchema = new Schema({
	question_id: Number,
	answer_id: Number,
	answer_body: String,
	answer_date: String | Date,
	answerer_name: String,
	helpfulness: Number,
	photos: [{id: Number, url: String}]
})

