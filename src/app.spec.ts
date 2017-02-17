import * as app from './app';
import { expect } from 'chai';

describe('app', () => {
    describe('rules should', () => {
        it('add five should add five', () => {
            expect(app.AddFiveRule(5)).to.eql(10);
        });

        it('subtract five should subtract five', () => {
            expect(app.SubtractFiveRule(10)).to.eql(5);
        });

        it('multiply by two should, well... multiply by two', () => {
            expect(app.MultiplyByTwoRule(10)).to.eql(20);
        });
    });

    describe('rules engine should', () => {
        const ruleSetA = [app.AddFiveRule, app.MultiplyByTwoRule, app.SubtractFiveRule];

        it('return the initial value if the initial value is less than or equal to zero', () => {
            var sut = new app.RulesEngine(ruleSetA);

            expect(sut.Run(0)).to.eql(0);
            expect(sut.Run(-5)).to.eql(-5);
        });

        it('run the rules as expected', () => {

        });
    });
});