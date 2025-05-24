import { add } from "../add";




test('sum function should calculate the sum of two numbers ', () => {
  const result = add(2,4);
  expect(result).toBe(6);
});
