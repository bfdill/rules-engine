import * as app from './app';
import { expect } from 'chai';

describe('app', () => {
    describe('rules should', () => {
        it('add five should add five', () => {
            const addFive = new app.AddFiveRule();
            expect(addFive.Action(5)).to.eql(10);
            expect(addFive.Action(10)).to.eql(15);
        });

        it('subtract five should subtract five', () => {
            const subtractFive = new app.SubtractFiveRule();
            expect(subtractFive.Action(15)).to.eql(10);
            expect(subtractFive.Action(10)).to.eql(5);
        });

        it('multiply by two should, well... multiply by two', () => {
            const double = new app.MultiplyByTwoRule();

            expect(double.Action(5)).to.eql(10);
            expect(double.Action(10)).to.eql(20);
        });

        it('StopIfLTEZero totally does nothing', () => {
            const stop = new app.StopIfLTEZero();

            expect(stop.Action(-1)).to.eql(-1);
            expect(stop.Action(10)).to.eql(10);
        });

        it('call the next rule if present', () => {
            const root = new app.AddFiveRule();
            root.Next = new app.MultiplyByTwoRule();

            expect(root.Action(5)).to.eql(20);
        });

        it('honor preconditions', () => {
            const root = new app.SubtractFiveRule();
            root.Next = new app.StopIfLTEZero();
            root.Next.Next = new app.MultiplyByTwoRule();

            expect(root.Action(4)).to.eql(-1);
            expect(root.Action(15)).to.eql(20);
        });
    });

    describe('rules engine should', () => {
        const ruleSetA = [new app.AddFiveRule(), new app.MultiplyByTwoRule(), new app.SubtractFiveRule()];
        const ruleSetB = [new app.SubtractFiveRule(), new app.SubtractFiveRule()];
        const ruleSetC = [new app.StopIfLTEZero(), new app.AddFiveRule(), new app.MultiplyByTwoRule(), new app.SubtractFiveRule()];
        const ruleSetD = [new app.SubtractFiveRule(), new app.StopIfLTEZero(), new app.AddFiveRule()];

        it('add five, double, and subtract five', () => {
            var sut = new app.RulesEngine(ruleSetA);

            expect(sut.Run(0)).to.eql(5);
            expect(sut.Run(-5)).to.eql(-5);
        });

        it('return expected results', () => {
            const sut = new app.RulesEngine(ruleSetA);

            expect(sut.Run(1)).to.eql(7);
            expect(sut.Run(5)).to.eql(15);
        });

        it('stop processing as expected', () => {
            let sut = new app.RulesEngine(ruleSetC);

            expect(sut.Run(0)).to.eql(0);
            expect(sut.Run(-1)).to.eql(-1);
            expect(sut.Run(6)).to.eql(17);

            sut = new app.RulesEngine(ruleSetD);

            expect(sut.Run(4)).to.eql(-1);
            expect(sut.Run(10)).to.eql(10);            
        });
    });
});