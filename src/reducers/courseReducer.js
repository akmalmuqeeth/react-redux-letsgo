import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action){
	switch(action.type) {
		case types.CREATE_COURSE :
			/* use spread operator to return all the elements of the passed in array
			then use Object.assign to create a deep copy of the course
			finally create a new array from the spread array and the copy of the course*/
			return [...state, Object.assign({}, action.course)];

		case types.LOAD_COURSES_SUCCESS:
			return action.courses;

		default :
			return state;
	}
}