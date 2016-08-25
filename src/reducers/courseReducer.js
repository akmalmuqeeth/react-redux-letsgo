import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action){
	switch(action.type) {
		case types.CREATE_COURSE :
			/* use spread operator to return all the elements of the passed in array
			then use Object.assign to create a deep copy of the course
			finally create a new array from the spread array and the copy of the course*/
			return [...state, Object.assign({}, action.course)];

		case types.CREATE_COURSE_SUCCESS:
			return [
				...state,
				Object.assign({}, action.course)
			];
		case types.UPDATE_COURSE_SUCCESS:
			return [
				...state.filter(course => course.id !== action.course.id),
				Object.assign({}, action.course)
			];
		
		case types.LOAD_COURSES_SUCCESS:
			return action.courses;

		default :
			return state;
	}
}