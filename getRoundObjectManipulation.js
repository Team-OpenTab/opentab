export default function manipulateData(response) {
  const roundStore = response.map(round => {
    const reducedRound = round.reduce((acc, curr) => {
      const counterparts = !acc.counterparts
        ? { [curr.counterpart_id]: curr.amount }
        : acc.counterparts;
      acc = {
        roundId: curr.round_id,
        userId: curr.user_id,
        counterparts: Object.assign({}, counterparts, { [curr.counterpart_id]: curr.amount }),
        roundTime: curr.time,
      };
      return acc;
    }, {});
    const roundTotal = Object.values(reducedRound.counterparts).reduce(
      (acc, item) => parseFloat(acc) + parseFloat(item),
      0,
    );
    const roundWithTotal = Object.assign({}, reducedRound, {
      roundTotal: roundTotal.toFixed(2),
    });
    return roundWithTotal;
  });
  return roundStore;
}
