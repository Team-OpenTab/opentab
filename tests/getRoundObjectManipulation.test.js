import manipulateData from '../getRoundObjectManipulation';

describe('function to turn data from db to usable store object', () => {
  it('returns the correctly formatted object', () => {
    const input = [
      [
        {
          id: 1,
          user_id: 1,
          counterpart_id: 1,
          round_id: 1,
          amount: '-10.00',
          type: 'round',
          time: 'test',
        },
        {
          id: 2,
          user_id: 1,
          counterpart_id: 2,
          round_id: 1,
          amount: '-10.00',
          type: 'round',
          time: 'test',
        },
        {
          id: 3,
          user_id: 1,
          counterpart_id: 3,
          round_id: 1,
          amount: '-10.00',
          type: 'round',
          time: 'test',
        },
      ],
    ];
    const expectedOutput = [
      {
        roundId: 1,
        userId: 1,
        counterparts: { 1: '-10.00', 2: '-10.00', 3: '-10.00' },
        roundTime: 'test',
        roundTotal: '-30.00',
      },
    ];

    const output = manipulateData(input);

    expect(output).toEqual(expectedOutput);
  });
});
