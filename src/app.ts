interface IRuleIdentifier {
    (value: number): number;
}

const AddFiveRule = (value: number) => {
    return value + 5;
};

const SubtractFiveRule = (value: number) => {
    return value - 5;
};

const MultiplyByTwoRule = (value: number) => {
    return value * 2;
}

class RulesEngine {
    constructor(private RuleIdentifiers: IRuleIdentifier[]) {}

    public Run(value: number): number {
        if (value <= 0) return value;

        let i = 0;
        let val = value;

        do {
            val = this.RuleIdentifiers[i](val);
            i++;
        } while (i < this.RuleIdentifiers.length && val > 0)

        return val;
    }
}

export {
    AddFiveRule,
    SubtractFiveRule,
    MultiplyByTwoRule,
    RulesEngine
}