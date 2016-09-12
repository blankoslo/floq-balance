import expect from 'expect';
import { navigation } from '../../src/selectors/titleSelector';

describe('titleSelector - navigation function returns expected ...', () => {
  // url month is 1 (jan) to 12 (dex) indexed, but momentjs is 0-indexed, as is this function
  it('next-date', () => {
    expect(navigation(2016, 8, '').next).toEqual('?year=2016&month=10');
  });

  it('previousDate-date', () => {
    expect(navigation(2016, 8, '').previous).toEqual('?year=2016&month=8');
  });

  it('next-date - corner case next year', () => {
    expect(navigation(2016, 11, '').next).toEqual('?year=2017&month=1');
  });

  it('previousDate-date - corner case last year', () => {
    expect(navigation(2016, 0, '').previous).toEqual('?year=2015&month=12');
  });
});
