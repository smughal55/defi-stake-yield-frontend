import { formatUnits } from "@ethersproject/units"
import { useEthers, useTokenBalance } from "@usedapp/core"
import { Token } from "../Main"
import { BalanceMsg } from "../BalanceMsg"

export interface WalletBalanceProps {
    token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    //console.log(tokenBalance?.toString())
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label={`Your un-staked ${name} balance`}
        tokenImgSrc={image}
        amount={formattedTokenBalance} />)
}