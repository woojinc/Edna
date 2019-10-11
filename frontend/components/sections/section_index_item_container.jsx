import React from 'react';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { 
    createSection,
    updateSection, 
    fetchSection,
} from '../../actions/section_actions';
import { Draggable } from 'react-beautiful-dnd';

class SectionIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.section;
        this.handleCreateSection = this.handleCreateSection.bind(this);
        this.handleOpenSection = this.handleOpenSection.bind(this);
        this.handleChangeNameState = this.handleChangeNameState.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    handleCreateSection(e){
        e.preventDefault();
        
        this.props.createSection({
            name: "New Section", 
            project_id: this.props.section.project_id,
            prev_section_id: this.props.section.prev_section_id,
            // next_section_id: this.props.section.next_section_id
        })
        // .then( result => {
        //     // update sections
        //     debugger
        //     this.state.sections[result.section.id] = result.sections[];
        //     // update project backend

        //     // update project state
        // })
        // debugger
        // this.props.createSection({section :{
        //     name: "New Section", 
        //     project_id: this.props.projectId,
        //     prev_section_id: this.props.prevSection.id,
        //     // next_section_id: this.props.nextSection.id
        // }, prevSection: this.props.prevSection})
        // .then( newSection => {
        //     console.log(newSection);
        //     debugger
        //     this.props.prevSection.next_section_id = newSection.id;
        //     dispatch(this.props.updateSection(this.props.prevSection));
        // });
        // debugger
        // .then( newSection => { const newSectionId = newSection.id })
        // .then( )
        // console.log(newSectionId);
        // debugger
        // this.props.fetchSection(this.props.prevId)
        // .then( prevSection => { let prevSectionState = prevSection.section }); 
        // debugger
        // prevSectionState.next_section_id = newSection.id;
        // this.props.updateSection(prevSectionState);
        // debugger
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
        e.stopPropagation();
        if (this.props.section.name !== this.state.name) {
            const updatedSection = this.props.section;
            updatedSection.name = this.state.name;
            this.props.updateSection(updatedSection);
        }
    }

    render() {
        const { section, projectId, createSectionItem } = this.props;
        const sectionItem = createSectionItem ? (
            (<button onClick={this.handleCreateSection}>
                <div className="section-index-item create-section" >
                    <div className="section-row">
                        <i className="fas fa-plus"></i>
                    </div >
                    <div className="section-name">
                        Add Section
                    </div>
                    <div className="section-subname">
                    </div>
                </div >
            </button>)
        ) : (
            (
            // button breaks dnd
            // <button onClick={this.handleOpenSection}>
                <div className="section-index-item" >
                    <div className="section-row">
                        <i className="far fa-check-circle"></i>
                    </div >
                    <div className="section-name">
                        <input 
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChangeNameState()}
                            // onKeyPress={() => (this.state.width = ((this.state.name.length+1)*8)+'px')}
                            // style={{width: this.state.width}}
                            onBlur={this.handleChangeName}/>
                        {/* {this.state.name} */}
                    </div>
                    <div className="section-subname">
                    </div>
                </div >
            // </button>
            
            )
        );
        // const sectionItem = section.name;
        // console.log(this.props.index);
        // console.log(sectionItem);
        // debugger
        return (
            sectionItem
            
            // createSectionItem ? (
            //     sectionItem
            // ) : (
            //         <Draggable draggableId={-this.props.section.id} index={this.props.index}>
            //             {(provided) => (
            //                 <div
            //                     {...provided.draggableProps}
            //                     {...provided.dragHandleProps}
            //                     ref={provided.innerRef}
            //                 >
            //                     {sectionItem}
            //                 </div>
            //             )}
            //         </Draggable>
            // )
        )
    }
};

const mapStateToProps = (state, { section, prevSection, nextSection, projectId, createSectionItem}) => {
    return {
        // section, prevSection, nextSection, projectId, createSectionItem
        section, createSectionItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSection: (section) => dispatch(createSection(section)),
        updateSection: (section) => dispatch(updateSection(section)),
        fetchSection: (id) => dispatch(fetchSection(id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SectionIndexItem));