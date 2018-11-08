import expect from "expect";
// import moment from 'moment';
// import * as Immutable from 'immutable';
import { navigation, getPeriod } from "../../src/selectors/titleSelector";

describe("titleSelector - navigation function returns expected ...", () => {
  // url month is 1 (jan) to 12 (dex) indexed, but momentjs is 0-indexed, as is this function
  it("next-date", () => {
    expect(navigation(2016, 8, "").next).toEqual("?year=2016&month=10");
  });

  it("previousDate-date", () => {
    expect(navigation(2016, 8, "").previous).toEqual("?year=2016&month=8");
  });

  it("next-date - corner case next year", () => {
    expect(navigation(2016, 11, "").next).toEqual("?year=2017&month=1");
  });

  it("previousDate-date - corner case last year", () => {
    expect(navigation(2016, 0, "").previous).toEqual("?year=2015&month=12");
  });
});

describe("titleSelector - getPeriod function", () => {
  it("aug 2016 returns 2016-08-01 as startDate", () => {
    expect(getPeriod(2016, 8, "").startDate).toEqual("2016-08-01");
  });

  it("aug 2016 returns 2016-08-31 as endDate", () => {
    expect(getPeriod(2016, 8, "").endDate).toEqual("2016-08-31");
  });

  it("feb 2016 returns 2016-02-29 as endDate", () => {
    expect(getPeriod(2016, 2, "").endDate).toEqual("2016-02-29");
  });

  it("feb 2017 returns 2017-02-28 as endDate", () => {
    expect(getPeriod(2017, 2, "").endDate).toEqual("2017-02-28");
  });
});
