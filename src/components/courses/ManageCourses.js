/*
import React from 'react';

class ManageCourses extends React.Component {

	constructor(props, context){
		super(props, context);

		this.state = {
			course : {title : ""}
		};


		this.onTitleChange = this.onTitleChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	onTitleChange(event) {
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({course : course});
	}

	onClickSave(event) {
		//alert(`Saving ${this.state.course.title}`);
		this.props.actions.createCourse(this.state.course);
	}

	render() {
		return (
			<div></div>
		)
	}
}

export default ManageCourses;*/
