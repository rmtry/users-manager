
const usersReducerDefaultState = {
  users: [],
  averageAge: undefined,
  oldest: undefined,
  youngest: undefined,
  northernMost: undefined,
  southernMost: undefined,
  isPageLoading: false,
};

export default (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      let users = action.users;

      let sortedUsersByAge = JSON.parse(JSON.stringify(users))
      sortedUsersByAge.sort((a,b) => new Date(a.dob.date).getTime() - new Date(b.dob.date).getTime())

      let sortedUsersByLongitude = JSON.parse(JSON.stringify(users))
      sortedUsersByLongitude.sort((a,b) => a.location.coordinates.longitude - b.location.coordinates.longitude)

      let age = 0;
      users.map(user => {
        age += user.dob.age;
        return '';
      })

      return {
        users: users,
        averageAge: (age/(users.length)).toFixed(1),
        oldest: sortedUsersByAge[0],
        youngest: sortedUsersByAge[users.length-1],
        northernMost: sortedUsersByLongitude[users.length-1],
        southernMost: sortedUsersByLongitude[0],
        isPageLoading: false
      }
    case "TOGGLE_LOADING":
      if(action.isPageLoading === 'true'){
        return {
          ...state,
          isPageLoading: true
        }
      }
      else if(action.isPageLoading === 'false'){
        return {
          ...state,
          isPageLoading: false
        }
      }
      break;
    default:
      return state;
  }
};
