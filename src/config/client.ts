const config: Record<string, any> = {};
const configViewForm: Record<string, any> = {};

const getContext = () => {
  const modules = import.meta.globEager('./**/config.json');
  Object.keys(modules).forEach((path) => {
    config[modules[path].default.name] = modules[path].default;
  });
};
const getKitConfigView = () => {
  const modules = import.meta.globEager(`./**/view.tsx`);
  Object.keys(modules).forEach((path) => {
    configViewForm[path.split('/')[1]] = modules[path].default;
  });
};

getContext();
getKitConfigView();

export default { config, configViewForm };
