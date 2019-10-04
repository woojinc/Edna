export const selectProject = ( { entities: { projects } } ) => {
    return Object.values(projects);
}