export default function courseReducer(state = [], action){
	switch(action.type) {
		case 'CREATE_COURSE' :
			/* use spread operator to return all the elements of the passed in array
			then use Object.assign to create a deep copy of the course
			finally create a new array from the spread array and the copy of the course*/
			return [...state, Object.assign({}, action.course)];
		default :
			return state;
	}
}