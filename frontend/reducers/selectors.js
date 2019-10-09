export const selectProject = ( { entities: { projects } } ) => {
    return Object.values(projects);
}

export const selectSection = ({ entities: { sections } }) => {
    return Object.keys(sections).map(id => {
        return sections[id]
    });
}

// export const getIncompleteTasks = (state) => {
//     return state.tasks.filter((task) => {
//         return !task.completed
//     });
// }