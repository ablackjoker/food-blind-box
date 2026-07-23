// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  beginPath: jest.fn(),
  arc: jest.fn(),
  clearRect: jest.fn(),
  closePath: jest.fn(),
  fill: jest.fn(),
  fillText: jest.fn(),
  lineTo: jest.fn(),
  moveTo: jest.fn(),
  restore: jest.fn(),
  rotate: jest.fn(),
  save: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn()
}));
