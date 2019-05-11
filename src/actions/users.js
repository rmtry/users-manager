export const setData = (users) => ({
    type: 'SET_DATA',
    users: users
})

export const toggleLoading = (isPageLoading) => ({
    type: 'TOGGLE_LOADING',
    isPageLoading: isPageLoading
})
