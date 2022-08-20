export default function findOptionById(options, id) {
  return options.find(({ id: optionId }) => optionId === id);
}
