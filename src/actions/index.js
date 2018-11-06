export default function goBack(previousComponent) {
  return {
    type: 'GO_BACK',
    previousComponent,
  };
}
