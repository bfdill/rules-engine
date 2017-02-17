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
        const ruleSetB = [app.SubtractFiveRule, app.SubtractFiveRule];

        it('return the initial value if the initial value is less than or equal to zero', () => {
            var sut = new app.RulesEngine(ruleSetA);

            expect(sut.Run(0)).to.eql(0);
            expect(sut.Run(-5)).to.eql(-5);
        });

        it('return expected results', () => {
            const sut = new app.RulesEngine(ruleSetA);

            expect(sut.Run(1)).to.eql(7);
            expect(sut.Run(5)).to.eql(15);
        });

        it('stop processing as expected', () => {
            const sut = new app.RulesEngine(ruleSetB);

            expect(sut.Run(1)).to.eql(-4);
            expect(sut.Run(4)).to.eql(-1);
            expect(sut.Run(6)).to.eql(-4);
            expect(sut.Run(10)).to.eql(0);
        });
    });
});