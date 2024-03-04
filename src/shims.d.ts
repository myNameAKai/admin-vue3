declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: defineComponent<object, object, any>
  export default component
}
