import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    createSection,
    updateSection, 
    fetchSection,
} from '../../actions/section_actions'

class SectionIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.section
        this.handleCreateSection = this.handleCreateSection.bind(this);
        this.handleOpenSection = this.handleOpenSection.bind(this);
        this.handleChangeNameState = this.handleChangeNameState.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleCreateSection(){
        debugger
        this.props.createSection({
            name: "New Section", 
            project_id: this.props.projectId,
            prev_section_id: this.props.prevId,
            next_section_id: this.props.nextId
        })
        .then( newSection => { const newSectionId = newSection.id });
        console.log(newSectionId);
        debugger
        this.props.fetchSection(this.props.prevId)
        .then( prevSection => { let prevSectionState = prevSection.section }); 
        debugger
        prevSectionState.next_section_id = newSection.id;
        this.props.updateSection(prevSectionState);
        debugger
    }

    handleOpenSection(){
        //`/sections/${section.id}`
    }

    handleChangeNameState(){
        return e => {
            this.setState({name: e.target.value})
        };
    }

    handleChangeName(e){
        e.preventDefault();
        if (this.props.section.name !== this.state.name) {
            this.props.updateSection(this.state);
        }
    }

    render() {
        const { section, projectId, createSectionItem } = this.props;
        const sectionItem = createSectionItem ? (
            <button onClick={this.handleCreateSection}>
                <div className="section-index-item">
                    <div className="section-row create-section">
                        <i className="fas fa-plus"></i>
                    </div >
                    <div className="section-name">
                        Add Section
                    </div>
                    <div className="section-subname">
                    </div>
                </div >
            </button>
        ) : (
            <button onClick={this.handleOpenSection}>
                <div className="section-index-item" >
                    <div className="section-row">
                        <i className="far fa-check-circle"></i>
                    </div >
                    <div className="section-name">
                        <input 
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChangeNameState()}
                            onBlur={this.handleChangeName}/>
                        {this.state.name}
                    </div>
                    <div className="section-subname">
                    </div>
                </div >
            </button>
        );
        return (
            sectionItem
        )
    }
};

const mapStateToProps = (state, {section, prevId, nextId, projectId, createSectionItem}) => {
    return {
        section, prevId, nextId, projectId, createSectionItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSection: (section) => dispatch(createSection(section)),
        updateSection: (section) => dispatch(updateSection(section)),
        fetchSection: (id) => dispatch(fetchSection(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionIndexItem);