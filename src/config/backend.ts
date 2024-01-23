import schemaForm from './schemaForm/index';
const config: Record<string, any> = {};
const configForm: Record<string, any> = {};

const getContext = () => {
  const modules = import.meta.globEager('./**/config.json');
  Object.keys(modules).forEach((path) => {
    config[modules[path].default.name] = modules[path].default;
  });
};

const getKitConfigForm = () => {
  const modules = import.meta.globEager(`./**/form.tsx`);
  Object.keys(modules).forEach((path) => {
    configForm[path.split('/')[1]] = modules[path].default;
  });
  Object.keys(config).forEach((type: string) => {
    if (config[type].useSchema) {
      configForm[type] = schemaForm;
    }
  });
};

getContext();
getKitConfigForm();

export default {
  config,
  configForm,
};
