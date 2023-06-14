import { mapState, mapActions } from 'vuex'

export const layoutComputed = {
  ...mapState('layout', {
    layoutType: (state) => state.layoutType,
    leftSidebarType: (state) => state.leftSidebarType,
    layoutWidth: (state) => state.layoutWidth,
    topbar: (state) => state.topbar,
    loader: (state) => state.loader
  })
}

export const layoutMethods = mapActions('layout', ['changeLayoutType', 'changeLayoutWidth', 'changeLeftSidebarType', 'changeTopbar', 'changeLoaderValue'])

export const authFackMethods = mapActions('authfack', ['login', 'registeruser', 'logout'])
export const authFackComputed = {
  ...mapState('authfack', {
    user: (state) => state.user,
  }),
}

export const notificationMethods = mapActions('notification', ['success', 'error', 'clear'])

export const todoComputed = {
  ...mapState('todo', {
    todos: (state) => state.todos
  })
}
export const todoMethods = mapActions('todo', [
  'fethgetallProducts',
  'fethgetallProductsbyId',
  'fethupdateProduct',
  'fethdeleteProduct',
  'fethRegisterProduct',
])