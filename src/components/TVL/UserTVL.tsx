import { formatUnits } from "@ethersproject/units"
import { useUserTotalValue } from "../../hooks"
import { TVLMsg } from "../TVLMsg"

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

interface UserTVLProps {
    fetch: boolean
}

export const UserTVL = ({ fetch }: UserTVLProps) => {

    var userTotalValue = useUserTotalValue(fetch)
    if (userTotalValue === undefined) {
        return (<TVLMsg
            amount={formatter.format(0)} />)
    } else {
        console.log("TVL: " + userTotalValue?.toString())
        const formattedValue: number = userTotalValue ? parseFloat(formatUnits(userTotalValue, 18)) : 0
        return (<TVLMsg
            amount={formatter.format(formattedValue)} />)
    }
}