const components = import.meta.globEager("@/components/*.vue");

const register = (app) => {
  Object.entries(components).forEach(([path, definition]) => {
    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    const componentName = path
      .split("/")
      .pop()
      .replace(/\.\w+$/, "");
    app.component(componentName, definition.default);
  });
};

export default {
  register,
};
