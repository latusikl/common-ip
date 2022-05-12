import print from './util/print';
import argParser from "./util/arg-parser";

function main() {
    print.appLogo()
    const programArgs = process.argv.slice(2);


    if (argParser.areParamsValid(programArgs)) {
        
        let num1:number = 0;
        let isCommon:boolean = true; 

        console.dir(programArgs)
        const parameters = argParser.convertToIParameter(programArgs);
        print.info(`Parameter 1: IP: ${parameters[0].ipAddress} | ${parameters[0].ipAddressNum.toString(2)}`)
        print.info(`Parameter 1: Mask: ${parameters[0].ipMaskShort} | ${parameters[0].ipMaskNum.toString(2)}`)
        print.info(`Parameter 2: IP: ${parameters[1].ipAddress} | ${parameters[1].ipAddressNum.toString(2)}`)
        print.info(`Parameter 2: Mask: ${parameters[1].ipMaskShort} | ${parameters[1].ipMaskNum.toString(2)}`)
        
        if (+parameters[0].ipMaskShort < +parameters[1].ipMaskShort) {

            for (let i = 0; i < +parameters[0].ipMaskShort - 1 ; i++) {

                if(parameters[0].ipAddressNum.toString(2).charAt(i) != parameters[1].ipAddressNum.toString(2).charAt(i)){
                    isCommon = false
                }
            } 

        } else {

            for (let i = 0; i < +parameters[1].ipMaskShort - 1 ; i++) {

                if(parameters[0].ipAddressNum.toString(2).charAt(i) != parameters[1].ipAddressNum.toString(2).charAt(i)){
                    isCommon = false
                }
            } 
        }

        if (isCommon) {

            print.appOutput("THERE IS A CONFLICT")

        } else {

            print.appOutput("THERE IS NOT A CONFLICT")

        }
        

    } else {
        print.error("Invalid number or parameters or parameters values are invalid.")
        print.commandUsage();
    }
}

main();
