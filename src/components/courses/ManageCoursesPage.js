import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';


class ManageCoursesPage extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			course: Object.assign({}, this.props.course),
			errors : {}
		};
		this.updateCourseState = this.updateCourseState.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.course.id != nextProps.course.id) {
			// Necessary to populate form when existing course is loaded directly.
			this.setState({course: Object.assign({}, nextProps.course)});
		}
	}

	updateCourseState(event) {
		const field = event.target.name;
		let course = this.state.course;
		course[field] = event.target.value;
		return this.setState({course: course});
	}

	saveCourse(event) {
		event.preventDefault();

		if (!this.courseFormIsValid()) {
			return;
		}

		this.setState({saving: true});

		this.props.actions.saveCourse(this.state.course)
			.then(() => this.redirect())
			.catch(error => {
				toastr.error(error);
				this.setState({saving: false});
			});
	}

	redirect() {
		this.setState({saving: false});
		toastr.success('Course saved');
		this.context.router.push('/courses');
	}

	courseFormIsValid() {
		let formIsValid = true;
		let errors = {};

		if (this.state.course.title.length < 5) {
			errors.title = 'Title must be at least 5 characters.';
			formIsValid = false;
		}

		this.setState({errors: errors});
		return formIsValid;
	}

	render() {
		return (
				<CourseForm
					allAuthors = {this.props.authors}
					onChange={this.updateCourseState}
					onSave={this.saveCourse}
					course={this.state.course}
					errors = {this.state.errors}

				/>
		);
	}
}

ManageCoursesPage.propTypes = {
	course : React.PropTypes.object.isRequired,
	authors : React.PropTypes.array.isRequired,
	actions : React.PropTypes.object.isRequired
};


//Pull in the React Router context so router is available on this.context.router.
ManageCoursesPage.contextTypes = {
	router: React.PropTypes.object
};

function getCourseById(courses, id) {
	const course = courses.filter(course => course.id == id);
	if (course.length) return course[0]; //since filter returns an array, have to grab the first.
	return null;
}

function mapStateToProps(state, ownProps) {
	const courseId = ownProps.params.id; // from the path `/course/:id`

	let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

	if (courseId && state.courses.length > 0) {
		course = getCourseById(state.courses, courseId);
	}

	const authorsFormattedForDropdown = state.authors.map(author => {
		return {
			value : author.id,
			text: author.firstName + ' ' + author.lastName
		};
	});


	return {
		course : course,
		authors : authorsFormattedForDropdown
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);