import { formatUnits } from "@ethersproject/units"
import { useEthers } from "@usedapp/core"
import { Token } from "../Main"
import { BalanceMsg } from "../BalanceMsg"
import { useStakedTokens } from "../../hooks"

export interface WalletBalanceProps {
    token: Token
}

export const StakedWalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useStakedTokens(address)
    console.log(tokenBalance?.toString())
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    return (<BalanceMsg
        label={`Your staked ${name} balance:`}
        tokenImgSrc={image}
        amount={formattedTokenBalance} />)
}