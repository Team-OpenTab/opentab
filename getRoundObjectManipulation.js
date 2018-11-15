export default function manipulateData(response) {
  const roundStore = response.map(transaction => {
    const round = transaction.reduce((acc, item) => {
      const counterparts = !acc.counterparts
        ? { [item.counterpart_id]: item.amount }
        : acc.counterparts;
      acc = {
        roundId: item.round_id,
        userId: item.user_id,
        counterparts: Object.assign({}, counterparts, { [item.counterpart_id]: item.amount }),
        roundTime: item.time,
      };
      return acc;
    }, {});
    const roundTotal = Object.values(round.counterparts).reduce(
      (acc, item) => parseFloat(acc) + parseFloat(item),
      0,
    );
    const roundWithTotal = Object.assign({}, round, {
      roundTotal: roundTotal.toFixed(2),
    });
    return roundWithTotal;
  });
  return roundStore;
}
