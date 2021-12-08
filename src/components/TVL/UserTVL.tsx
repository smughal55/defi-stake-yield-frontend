import { formatUnits } from "@ethersproject/units"
import { useUserTotalValue, useUniqueTokensStaked } from "../../hooks"
import { TVLMsg } from "../TVLMsg"
import { useEthers } from "@usedapp/core"

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const UserTVL = () => {

    const { account } = useEthers()

    var uniqueTokensStaked = useUniqueTokensStaked()
    console.log("uniqueTokensStaked: " + uniqueTokensStaked)

    var userAccountOrFalse = uniqueTokensStaked === undefined || uniqueTokensStaked == 0 ? false : account
    console.log("userAccountOrFalse: " + userAccountOrFalse)

    var userTotalValue = useUserTotalValue(userAccountOrFalse)
    if (userTotalValue == undefined) {
        return (<TVLMsg
            amount={formatter.format(0)} />)
    } else {
        console.log("TVL: " + userTotalValue?.toString())
        const formattedValue: number = userTotalValue ? parseFloat(formatUnits(userTotalValue, 18)) : 0
        return (<TVLMsg
            amount={formatter.format(formattedValue)} />)
    }
}