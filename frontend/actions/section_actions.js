import * as APISectionUtils from '../util/section_api_util';

import { closeModal } from '../actions/modal_actions';

export const GET_ALL_SECTIONS = "GET_ALL_SECTIONS";
export const GET_UPDATED_SECTIONS = "GET_UPDATED_SECTIONS";
export const GET_SECTION = "GET_SECTION";
export const DELETE_SECTION = "DELETE_SECTION";

export const getAllSections = (sections) => {
    return {
        type: GET_ALL_SECTIONS,
        sections
    }
};

export const getUpdatedSections = (sections) => {
    return {
        type: GET_UPDATED_SECTIONS,
        sections
    }
};

export const getSection = (section) => {
    return {
        type: GET_SECTION,
        section
    }
};

export const removeSection = (sectionId) => {
    return {
        type: DELETE_SECTION,
        sectionId
    }
};

export const fetchAllSections = (projectId) => dispatch => (
    APISectionUtils.getAllSections(projectId)
        .then(sections => dispatch(getAllSections(sections)))
);

export const fetchSection = id => dispatch => (
    APISectionUtils.getSection(id)
        .then(section => dispatch(getSection(section)))
); 

export const createSection = (section) => dispatch => {
    return APISectionUtils.createSection(section)
        .then(sections => dispatch(getAllSections(sections)));
};

// export const createSection = ({section, prevSection}) => dispatch => {
//     // APISectionUtils.createSection(section)
//     //     .then(section => dispatch(getSection(section)))\
//     console.log(section)
//     return APISectionUtils.createSection(section)
//         .then(section => {
//             prevSection.next_section_id = section.id;
//             dispatch(updateSection(prevSection));
//             dispatch(getSection(section));
//         })
//         // .then(section => dispatch(getSection(section)));
// };

export const updateSection = section => dispatch => (
    APISectionUtils.updateSection(section)
        .then(section => dispatch(getSection(section)))
        // .then(() => dispatch(closeModal()))
);

export const deleteSection = id => dispatch => {
    return APISectionUtils.deleteSection(id)
        .then(section => dispatch(removeSection(id)))
        // .then(() => dispatch(closeModal()))
};