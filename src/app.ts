interface IRule {
    PreCondition: (value: number) => boolean;
    Action: (value: number) => number;
    Next: IRule;
}

abstract class BaseRule {
    public Next: IRule;

    PreCondition(value: number): boolean {
        return true;
    }

    Action(value: number): number {
        if (!this.PreCondition(value)) {
            return value;
        }

        const result = this.Calculate(value);

        return (this.Next) ? this.Next.Action(result) : result;
    }

    abstract Calculate(value: number): number;
}

class AddFiveRule extends BaseRule {
    Calculate(value: number): number {
        return value + 5;
    }
}

class SubtractFiveRule extends BaseRule {
    Calculate(value: number): number {
        return value - 5;
    }
}

class MultiplyByTwoRule extends BaseRule {
    Calculate(value: number): number {
        return value * 2;
    }
}

class StopIfLTEZero extends BaseRule {
    PreCondition(value: number): boolean {
        return value > 0;
    }
    Calculate(value: number): number {
        return value;
    }
}

class RulesEngine {
    private rootRule: IRule;

    constructor(private Rules: IRule[]) {
        if (Rules == null) {
            throw new Error('gonna need a rule here');
        }

        // no work in ctor :'(
        if (Rules.length == 1) {
            this.rootRule == Rules[0];
        }
    }

    private GetRootRule(): IRule {
        if (this.rootRule) {
            return this.rootRule;
        }

        for (let i = this.Rules.length - 1; i >= 1; i--) {
            this.Rules[i - 1].Next = this.Rules[i];
        }

        this.rootRule = this.Rules[0];

        return this.rootRule;
    }

    public Run(value: number): number {
        const rule = this.GetRootRule();

        return rule.Action(value);
    }
}

export {
    AddFiveRule,
    SubtractFiveRule,
    MultiplyByTwoRule,
    StopIfLTEZero,
    RulesEngine
}