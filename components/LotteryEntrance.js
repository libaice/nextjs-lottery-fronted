import {useWeb3Contract, useWeb3Transfer} from "react-moralis"
import {abi, contractAddress} from "../constants"
import {useMoralis} from 'react-moralis'
import {useEffect, useState} from "react";
import {ethers} from "ethers"
import {useNotification} from 'web3uikit'

export default function LotteryEntrance() {
    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();
    const chainId = parseInt(chainIdHex)

    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    // let entranceFee = ""

    const dispatch = useNotification();


    // use useState hook
    const [entranceFee, setEntranceFee] = useState("0")

    const {runContractFunction: enterRaffle} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee
    })

    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {}

    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString();
                setEntranceFee(entranceFeeFromCall);
            }

            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1);
        handleNewNotification(tx)
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Tx complate !",
            title: "Tx notification",
            position: "Top R",
            icon: "bell",
        })
    }


    return <div>
        Hi From Lottery entrance
        {raffleAddress ? (
            <div>
                <button onClick={async function () {
                    await enterRaffle(
                        {
                            onSuccess: handleSuccess,
                            onError: (error) => console.log(error)
                        }
                    );
                }}> Enter Raffle
                </button>
                Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")} ETH </div>) : (
            <div> No Raffle Address Detached </div>
        )}

    </div>
}