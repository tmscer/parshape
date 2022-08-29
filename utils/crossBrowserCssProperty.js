export default function crossBrowserCssProperty(name, value) {
  return {
    [name]: value,
    [`Webkit${name}`]: value,
    [`Moz${name}`]: value,
    [`ms${name}`]: value,
  };
}
